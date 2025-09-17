export function getDefaultBody(path: string): string {
  // Normalize path by removing trailing slash for consistent matching
  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;

  const defaultBodies: Record<string, string> = {
    "/api/v1/ai/chat": JSON.stringify(
      {
        user_input: "string",
      },
      null,
      2
    ),

    "/api/v1/ai/rag/query": JSON.stringify(
      {
        query: "string",
      },
      null,
      2
    ),

    "/api/v1/bvn/verify": JSON.stringify(
      {
        bvn: "string",
      },
      null,
      2
    ),

    "/api/v1/bvn/lookup": JSON.stringify(
      {
        bvn: "string",
      },
      null,
      2
    ),

    "/api/v1/bvn/match": JSON.stringify(
      {
        bvn: "string",
        first_name: "string",
        last_name: "string",
        date_of_birth: "string",
      },
      null,
      2
    ),

    "/api/v1/maps/route": JSON.stringify(
      {
        origin: { lat: 0, lng: 0 },
        destination: { lat: 0, lng: 0 },
        mode: "DRIVE",
        routing_pref: "TRAFFIC_AWARE",
        compute_alternative_routes: false,
        route_modifiers: {
          avoid_tolls: false,
          avoid_highways: true,
          avoid_ferries: false,
        },
        language_code: "en-US",
        units: "METRIC",
      },
      null,
      2
    ),

    "/api/v1/maps/routes/routes": JSON.stringify(
      {
        origin: { lat: 0, lng: 0 },
        destination: { lat: 0, lng: 0 },
        mode: "DRIVE",
        routing_pref: "TRAFFIC_AWARE",
        compute_alternative_routes: false,
        route_modifiers: {
          avoid_tolls: false,
          avoid_highways: true,
          avoid_ferries: false,
        },
        language_code: "en-US",
        units: "METRIC",
      },
      null,
      2
    ),

    "/api/v1/nin/verify": JSON.stringify(
      {
        nin: "string",
      },
      null,
      2
    ),

    "/api/v1/nin/lookup": JSON.stringify(
      {
        nin: "string",
      },
      null,
      2
    ),

    "/api/v1/sms/send": JSON.stringify(
      {
        to: "string",
        message: "string",
        sender: "string",
      },
      null,
      2
    ),

    "/api/v1/sms/send-bulk": JSON.stringify(
      {
        to: ["string"],
        message: "string",
        sender: "string",
      },
      null,
      2
    ),
  };

  return defaultBodies[normalizedPath] || "{\n  \n}";
}
