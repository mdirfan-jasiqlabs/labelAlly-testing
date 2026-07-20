# Phase E — Generate production brand assets from approved logo.jpeg
# Does not redesign the logo; only removes background and remaps for dark surfaces.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'scripts\source\logo-master.jpeg'
if (-not (Test-Path $srcPath)) {
  # Fallback for older checkouts still shipping public/logo.jpeg
  $fallback = Join-Path $root 'public\logo.jpeg'
  if (Test-Path $fallback) { $srcPath = $fallback }
  else { throw "Missing logo master at scripts/source/logo-master.jpeg" }
}
$brandDir = Join-Path $root 'public\brand'
$publicDir = Join-Path $root 'public'

New-Item -ItemType Directory -Force -Path $brandDir | Out-Null

function Get-Luma([System.Drawing.Color]$c) {
  return (0.299 * $c.R) + (0.587 * $c.G) + (0.114 * $c.B)
}

function Get-Saturation([System.Drawing.Color]$c) {
  $max = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
  $min = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
  if ($max -eq 0) { return 0.0 }
  return (($max - $min) / [double]$max)
}

function Test-Background([System.Drawing.Color]$c) {
  # JPEG white/off-white paper (incl. warm compression haze), not brand reds
  $luma = Get-Luma $c
  $sat = Get-Saturation $c
  $isWarmHaze = ($luma -ge 228 -and $sat -le 0.18 -and $c.R -ge 220)
  $isNeutralPaper = ($luma -ge 235 -and $sat -le 0.12)
  return ($isWarmHaze -or $isNeutralPaper)
}

function Test-NearBlack([System.Drawing.Color]$c) {
  # Black/dark grey ink, excluding brand reds
  $isDark = ((Get-Luma $c) -le 70 -and (Get-Saturation $c) -le 0.35)
  $isRedish = ($c.R -gt ($c.G + 35) -and $c.R -gt ($c.B + 35) -and $c.R -ge 90)
  return ($isDark -and -not $isRedish)
}

function Get-SoftAlpha([System.Drawing.Color]$c) {
  # Soften anti-aliased edge fringe against white paper
  $luma = Get-Luma $c
  $sat = Get-Saturation $c
  if ($sat -gt 0.22) { return 255 }
  if ($luma -ge 250) { return 0 }
  if ($luma -ge 210) {
    $t = ($luma - 210) / 40.0
    return [int][Math]::Round(255 * (1.0 - $t))
  }
  return 255
}

function Get-ContentBounds([System.Drawing.Bitmap]$bmp) {
  $minX = $bmp.Width; $minY = $bmp.Height; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
      $c = $bmp.GetPixel($x, $y)
      if (-not (Test-Background $c)) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt 0) { throw 'No non-white content found in logo.jpeg' }
  # Small padding around crop
  $pad = 12
  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($bmp.Width - 1, $maxX + $pad)
  $maxY = [Math]::Min($bmp.Height - 1, $maxY + $pad)
  return @{ X = $minX; Y = $minY; W = ($maxX - $minX + 1); H = ($maxY - $minY + 1) }
}

function New-TransparentLogo([System.Drawing.Bitmap]$src, $bounds, [bool]$forDark) {
  $out = New-Object System.Drawing.Bitmap $bounds.W, $bounds.H, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $bounds.H; $y++) {
    for ($x = 0; $x -lt $bounds.W; $x++) {
      $c = $src.GetPixel(($bounds.X + $x), ($bounds.Y + $y))
      if (Test-Background $c) {
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        continue
      }

      $alpha = Get-SoftAlpha $c
      if ($alpha -le 0) {
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        continue
      }

      if ($forDark -and (Test-NearBlack $c)) {
        # Preserve design; remap black ink to white for dark surfaces
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
      } else {
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
      }
    }
  }
  return $out
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function Resize-Contain([System.Drawing.Bitmap]$src, [int]$boxW, [int]$boxH, [System.Drawing.Color]$bg) {
  $canvas = New-Object System.Drawing.Bitmap $boxW, $boxH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.Clear($bg)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $scale = [Math]::Min(($boxW / [double]$src.Width), ($boxH / [double]$src.Height))
  $dw = [int][Math]::Round($src.Width * $scale)
  $dh = [int][Math]::Round($src.Height * $scale)
  $dx = [int](($boxW - $dw) / 2)
  $dy = [int](($boxH - $dh) / 2)
  $g.DrawImage($src, $dx, $dy, $dw, $dh)
  $g.Dispose()
  return $canvas
}

function New-OgImage([System.Drawing.Bitmap]$logo, [int]$w, [int]$h) {
  # Brand light surface (#FCFCFF) — matches site theme-color / page bg
  $bg = [System.Drawing.Color]::FromArgb(255, 252, 252, 255)
  $canvas = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.Clear($bg)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

  # Soft brand accent wash (subtle, not a redesign)
  $accent = [System.Drawing.Color]::FromArgb(28, 249, 115, 22) # orange-500 soft
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.Rectangle 0, 0, $w, $h),
    $accent,
    [System.Drawing.Color]::FromArgb(0, 249, 115, 22),
    45.0
  )
  $g.FillRectangle($brush, 0, 0, $w, $h)
  $brush.Dispose()

  $maxLogoH = [int]($h * 0.62)
  $maxLogoW = [int]($w * 0.42)
  $scale = [Math]::Min(($maxLogoW / [double]$logo.Width), ($maxLogoH / [double]$logo.Height))
  $dw = [int][Math]::Round($logo.Width * $scale)
  $dh = [int][Math]::Round($logo.Height * $scale)
  $dx = [int](($w - $dw) / 2)
  $dy = [int](($h - $dh) / 2)
  $g.DrawImage($logo, $dx, $dy, $dw, $dh)
  $g.Dispose()
  return $canvas
}

function Crop-Mark([System.Drawing.Bitmap]$logo) {
  # Top ~48% is the LA monogram mark — used for favicon / apple-touch
  $markH = [Math]::Max(1, [int]($logo.Height * 0.48))
  $rect = New-Object System.Drawing.Rectangle 0, 0, $logo.Width, $markH
  return $logo.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

Write-Host "Loading $srcPath"
$src = New-Object System.Drawing.Bitmap $srcPath
$bounds = Get-ContentBounds $src
Write-Host ("Content bounds: {0},{1} {2}x{3}" -f $bounds.X, $bounds.Y, $bounds.W, $bounds.H)

$logoLight = New-TransparentLogo $src $bounds $false
$logoDark = New-TransparentLogo $src $bounds $true

$logoLightPath = Join-Path $brandDir 'logo.png'
$logoDarkPath = Join-Path $brandDir 'logo-on-dark.png'
Save-Png $logoLight $logoLightPath
Save-Png $logoDark $logoDarkPath
Write-Host "Wrote $logoLightPath ($($logoLight.Width)x$($logoLight.Height))"
Write-Host "Wrote $logoDarkPath ($($logoDark.Width)x$($logoDark.Height))"

# Canonical brand paths live under /brand/
Write-Host 'Canonical paths: /brand/logo.png and /brand/logo-on-dark.png'
$mark = Crop-Mark $logoLight
# Opaque light surface so the black "L" stays visible in browser tabs
$faviconBg = [System.Drawing.Color]::FromArgb(255, 252, 252, 255)
$favicon = Resize-Contain $mark 64 64 $faviconBg
$faviconPath = Join-Path $publicDir 'favicon.png'
Save-Png $favicon $faviconPath
Write-Host "Wrote $faviconPath"

# 32px companion for denser declarations
$favicon32 = Resize-Contain $mark 32 32 $faviconBg
Save-Png $favicon32 (Join-Path $publicDir 'favicon-32x32.png')
$favicon32.Dispose()


$appleBg = [System.Drawing.Color]::FromArgb(255, 252, 252, 255)
$apple = Resize-Contain $mark 180 180 $appleBg
$applePath = Join-Path $publicDir 'apple-touch-icon.png'
Save-Png $apple $applePath
Write-Host "Wrote $applePath"

$og = New-OgImage $logoLight 1200 630
$ogPath = Join-Path $publicDir 'default-og.png'
Save-Png $og $ogPath
$ogBrandPath = Join-Path $brandDir 'og-image.png'
Save-Png $og $ogBrandPath
Write-Host "Wrote $ogPath and $ogBrandPath (1200x630)"

# Self-contained SVG favicon: light plate + embedded PNG mark (no external href)
$faviconBytes = [System.IO.File]::ReadAllBytes($faviconPath)
$faviconB64 = [Convert]::ToBase64String($faviconBytes)
$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="LabelAlly Entertainment">
  <rect width="64" height="64" rx="12" fill="#FCFCFF"/>
  <image href="data:image/png;base64,$faviconB64" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
</svg>
"@
Set-Content -Path (Join-Path $publicDir 'favicon.svg') -Value $svg -Encoding UTF8
Write-Host 'Wrote favicon.svg (embedded mark)'


# Dimensions sidecar for components
$meta = @{
  logoWidth = $logoLight.Width
  logoHeight = $logoLight.Height
  generatedAt = (Get-Date).ToString('o')
} | ConvertTo-Json
Set-Content -Path (Join-Path $brandDir 'manifest.json') -Value $meta -Encoding UTF8

$src.Dispose(); $logoLight.Dispose(); $logoDark.Dispose(); $mark.Dispose(); $favicon.Dispose(); $apple.Dispose(); $og.Dispose()
Write-Host 'Phase E asset generation complete.'
