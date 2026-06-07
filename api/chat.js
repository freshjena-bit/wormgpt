export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch(
      `https://api-nanzz.my.id/docs/api/aii/worm-gpt.php?prompt=${encodeURIComponent(prompt)}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    return res.status(200).json({
      reply: data.result.response
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Gagal memproses permintaan AI."
    });
  }
}
