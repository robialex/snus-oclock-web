exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { password } = JSON.parse(event.body);

    // The real password lives ONLY in Netlify environment variables
    // Set ADMIN_PASSWORD in: Netlify Dashboard → Site Settings → Environment Variables
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      console.error("ADMIN_PASSWORD environment variable is not set!");
      return { statusCode: 500, body: JSON.stringify({ error: "Server misconfiguration" }) };
    }

    if (password === correctPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false })
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }
};
