
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Pesan tidak boleh kosong." }),
        { status: 400 }
      );
    }

    const apiKey = Netlify.env.get("OPENAI_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key belum dikonfigurasi." }),
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions:
            "Kamu adalah Astra, AI assistant yang ramah, jelas, dan membantu. Jawab dalam bahasa yang digunakan pengguna.",
          input: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data.error?.message || "Gagal menghubungi AI."
        }),
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({
        reply: data.output_text || "Maaf, belum ada jawaban."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan pada server." }),
      { status: 500 }
    );
  }
};
