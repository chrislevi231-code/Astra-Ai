
export default async (request) => {
    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({
                error: "Method not allowed"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {
        const body = await request.json();
        const message = body.message;

        if (!message || typeof message !== "string") {
            return new Response(
                JSON.stringify({
                    error: "Pesan tidak boleh kosong"
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const apiKey = Netlify.env.get("AI_API_KEY");

        if (!apiKey) {
            return new Response(
                JSON.stringify({
                    error: "AI API belum dikonfigurasi"
                }),
                {
                    status: 503,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                error: "Konfigurasi penyedia AI belum dipasang"
            }),
            {
                status: 501,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Terjadi kesalahan pada server"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};
