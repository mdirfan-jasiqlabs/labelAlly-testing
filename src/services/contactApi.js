/**
 * contactApi — Client API wrapper for sending contact form payloads.
 *
 * Sends a POST request to the local endpoint /api/contact.
 * Handles and distinguishes rates limit (429), server errors, and offline/network errors.
 */
export async function sendContactForm(data) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle status 429 - Rate limited
    if (response.status === 429) {
      const error = new Error('Rate limit exceeded');
      error.status = 429;
      throw error;
    }

    // Handle standard server failures
    if (!response.ok) {
      const error = new Error('Server error occurred');
      error.status = response.status;
      throw error;
    }

    // Parse output payload safely
    let responseData = {};
    try {
      responseData = await response.json();
    } catch {
      // Handle response without JSON body
    }

    return responseData;
  } catch (err) {
    // If the error already has a status (like 429 or other non-ok HTTP statuses), rethrow it
    if (err.status) {
      throw err;
    }

    // Distinguish offline/network failures (fetch fails completely, e.g. TypeError)
    const networkError = new Error('Network or connectivity error occurred');
    networkError.status = 'network';
    throw networkError;
  }
}
