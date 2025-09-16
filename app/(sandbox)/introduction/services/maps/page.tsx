"use client";

import { Badge } from "@/components/ui/badge";
import { Map, Code, Navigation, MapPin, Route, Camera } from "lucide-react";
import { PageNavigation } from "@/app/(sandbox)/components/page-navigation";
import { getNavigation } from "@/app/(sandbox)/lib/navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";
import { CodeBlock } from "../components/code-block";
import { LanguageSelector } from "../components/language-selector";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.dsnsandbox.com";

const mapsEndpoints = [
  {
    name: "Nearby Places Search",
    method: "GET",
    path: "/api/v1/maps/nearby",
    description:
      "Finds nearby places around a given latitude/longitude. Default type is hospital.",
    examples: {
      curl: `curl -X GET "${baseUrl}/api/v1/maps/nearby?lat=6.6018&lng=3.3515&radius=1500&type=hospital" \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/maps/nearby?lat=6.6018&lng=3.3515&radius=1500&type=hospital', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/maps/nearby',
    headers={'Authorization': f'Bearer {token}'},
    params={
        'lat': 6.6018,
        'lng': 3.3515,
        'radius': 1500,
        'type': 'hospital'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/maps/nearby?lat=6.6018&lng=3.3515&radius=1500&type=hospital');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/maps/nearby?lat=6.6018&lng=3.3515&radius=1500&type=hospital"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      places: [
        {
          business_status: "OPERATIONAL",
          geometry: {
            location: {
              lat: 6.590431199999999,
              lng: 3.3422622,
            },
            viewport: {
              northeast: {
                lat: 6.591719729892721,
                lng: 3.343549929892723,
              },
              southwest: {
                lat: 6.589020070107277,
                lng: 3.340850270107278,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/hospital-71.png",
          icon_background_color: "#F88181",
          icon_mask_base_uri:
            "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hospital-H_pinlet",
          name: "Lagos State University Teaching Hospital (LASUTH)",
          opening_hours: {
            open_now: true,
          },
          photos: [
            {
              height: 3456,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/104003355461659338908">A Google User</a>',
              ],
              photo_reference:
                "AciIO2fEs8RcNyMN9Rkq6PA2ZjGip9ZhF9j-zey33JCDldY8AOQCALdgWQwcZTytQ7-1Jeyytch0PQhl8fjFWrBaDn3mYNQ6qTWs1BUA2uDN91-PL6TqNVRGJV84gbzF1aMcVgsm-lpCikjO9kjLV4W6OKoMNADQZ0b3G1RJIjQtplwSQKqYn1FuX19feFRR3UrtXxhZxXHo2Yi70O00UCPFqGMTzcWhVFrCNQy-kwr4BmKuQ1qZ9HpE3s6uVkCZOQorQKpzaS3ILkA6b0ydclWb9SThh_RroFlMkxjeNnRCtKiRC_XKBYbo7xgrguixN0e_hLwf_AZvzB9Z8PwMf-09sjAm5fFKedHyiZ3EjWxW3gkPGPv2wjU1JOs71ZJruCNPaJbKbG0fUrX3xDiOQrH40Le8EAEfvrXy27pQ5pRZosOb3gFXQwsvHdwJ0kNlAbja8HkcGZ5p6bVv-Z8uO16QmkqavFhuR7XrbRFaap6f2HCOjafBX46oVmitzh7gzdmuBUs0IX9pUwspU28OIBvzWsNAyzJ7dPIzUJAwOMEo-qnPfr4iooj1kf9SNzZ9aanFcFik2hKBuH5xiw",
              width: 4608,
            },
          ],
          place_id: "ChIJ41AYLQyTOxAR5-_uIIeb5fI",
          plus_code: {
            compound_code: "H8RR+5W Ikeja",
            global_code: "6FR5H8RR+5W",
          },
          rating: 4,
          reference: "ChIJ41AYLQyTOxAR5-_uIIeb5fI",
          scope: "GOOGLE",
          types: [
            "hospital",
            "doctor",
            "health",
            "point_of_interest",
            "establishment",
          ],
          user_ratings_total: 2596,
          vicinity: "1-5 Oba Akinjobi Way, Ikeja",
          url: "https://www.google.com/maps/place/?q=place_id:ChIJ41AYLQyTOxAR5-_uIIeb5fI",
        },
      ],
    },
  },
  {
    name: "Distance Matrix",
    method: "GET",
    path: "/api/v1/maps/distance",
    description:
      "Calculates travel distance and estimated time between two locations.",
    examples: {
      curl: `curl -X GET "${baseUrl}/api/v1/maps/distance?origin=Ikeja&destination=Ikoyi&mode=driving" \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/maps/distance?origin=Ikeja&destination=Ikoyi&mode=driving', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/maps/distance',
    headers={'Authorization': f'Bearer {token}'},
    params={
        'origin': 'Ikeja',
        'destination': 'Ikoyi',
        'mode': 'driving'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/maps/distance?origin=Ikeja&destination=Ikoyi&mode=driving');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/maps/distance?origin=Ikeja&destination=Ikoyi&mode=driving"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      destination_addresses: ["Ikoyi, Lagos 106104, Lagos, Nigeria"],
      origin_addresses: ["Ikeja, Lagos, Nigeria"],
      rows: [
        {
          elements: [
            {
              distance: {
                text: "28.0 km",
                value: 27990,
              },
              duration: {
                text: "36 mins",
                value: 2133,
              },
              status: "OK",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Directions",
    method: "GET",
    path: "/api/v1/maps/directions",
    description:
      "Provides narrative turn-by-turn instructions between two points.",
    examples: {
      curl: `curl -X GET "${baseUrl}/api/v1/maps/directions?origin=6.663507766417541,3.519219458436583&destination=6.500711037669258,3.3791664316813574&mode=driving" \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/maps/directions?origin=6.663507766417541,3.519219458436583&destination=6.500711037669258,3.3791664316813574&mode=driving', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/maps/directions',
    headers={'Authorization': f'Bearer {token}'},
    params={
        'origin': '6.663507766417541,3.519219458436583',
        'destination': '6.500711037669258,3.3791664316813574',
        'mode': 'driving'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/maps/directions?origin=6.663507766417541,3.519219458436583&destination=6.500711037669258,3.3791664316813574&mode=driving');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/maps/directions?origin=6.663507766417541,3.519219458436583&destination=6.500711037669258,3.3791664316813574&mode=driving"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: [
      {
        bounds: {
          northeast: {
            lat: 6.6634541,
            lng: 3.5195362,
          },
          southwest: {
            lat: 6.499049599999999,
            lng: 3.3667207,
          },
        },
        copyrights: "Powered by Google, ©2025 Google",
        legs: [
          {
            distance: {
              text: "32.6 km",
              value: 32582,
            },
            duration: {
              text: "51 mins",
              value: 3068,
            },
            end_address:
              "41 Queen St, Alagomeji-Yaba, Lagos 101245, Lagos, Nigeria",
            end_location: {
              lat: 6.500792199999999,
              lng: 3.3793555,
            },
            start_address:
              "314 Ojuemuren, Ikorodu - Shagamu Rd, Ikorodu, Lagos 104101, Lagos, Nigeria",
            start_location: {
              lat: 6.6634541,
              lng: 3.5191442,
            },
            steps: [
              {
                distance: {
                  text: "4.7 km",
                  value: 4658,
                },
                duration: {
                  text: "9 mins",
                  value: 522,
                },
                end_location: {
                  lat: 6.6252596,
                  lng: 3.5054703,
                },
                html_instructions:
                  "Head <b>southeast</b> on <b>Ikorodu - Shagamu Rd</b>/<wbr/><b>Lagos - Shagamu Rd</b>/<wbr/><b>Shagamu</b>/<wbr/><b>A1</b> toward <b>Odonla Rd</b><div style=&quot;font-size:0.9em&quot;>Pass by Danovalab (on the left)</div>",
                polyline: {
                  points:
                    "qmtg@sinT?Ad@ULERI\\Gf@GXCv@EXAV?vAA\\?fBAT?bCA`B?j@?d@?D?^?b@?D?^A`@?B?N?V?b@Ab@?T?zA@f@?d@?f@?D?^AB?`@?@?`@Ab@?fB?p@?t@@TAzA@B?jAF@?`@BB?d@D@?d@Dh@J~@L`@F`@H`@F`@H^F`@H`@H`@F`@HXDt@NvDt@TF`@H`@JRDr@N^F@?b@HRD`@H`@Hb@HF@z@PpAX~@R~AZ\\HZHJBb@H`@HNDbB\\b@H|AZ\\Hd@Jd@L|@VZH@?XJVFB@LBN@B@D?FBRFD@ZJ^N^L`@LJDFBfA`@j@T`@N^N^NHD`@NFBz@\\JD^N^NFBPH^NzBbAtAd@lAd@JD\\P^PhAj@dAh@j@\\z@`@rAp@jAj@jB~@b@RVNxC|AhAj@n@X`CpA~BrAZZd@^DLLLv@r@r@p@|AtAt@v@v@t@DF^^LL~AbBTRTRPLNJLHTJ^LVJlA\\\\JjBf@`@L^L`@LbDjAtAh@@@B@B@B?jBz@`@NB@hAd@",
                },
                start_location: {
                  lat: 6.6634541,
                  lng: 3.5191442,
                },
                travel_mode: "DRIVING",
              },
              {
                distance: {
                  text: "1.0 km",
                  value: 975,
                },
                duration: {
                  text: "3 mins",
                  value: 169,
                },
                end_location: {
                  lat: 6.6259951,
                  lng: 3.4967693,
                },
                html_instructions:
                  "Turn <b>right</b> at Tony Auto Store onto <b>Sulaimon Shoderu Street</b><div style=&quot;font-size:0.9em&quot;>Pass by Tripple&apos;A&apos;max Electrical and installation services (on the left)</div>",
                maneuver: "turn-right",
                polyline: {
                  points:
                    "{~lg@etkTa@pAABKZQd@Wj@KZId@Gp@Cx@CnBArAAlC?h@CtBCdJAb@?fA?d@AjB?D?b@?d@?b@?J?VAb@?b@Ab@",
                },
                start_location: {
                  lat: 6.6252596,
                  lng: 3.5054703,
                },
                travel_mode: "DRIVING",
              },
            ],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        overview_polyline: {
          points:
            "qmtg@sinTfAg@dAOpAIfDCbJCbFAlG?|DCrF@pB?nAFf@BvBVhGbA~B`@dHvAdFbA|VfFfDz@nA\\d@Hf@LdGxB|ElBxAl@zCrAbDjArCtA`GzCrFnCtKtF~BrAZZj@l@vEhElHnHdAn@bDbAnEpAzFvBvB~@d@PhAd@a@pAM^i@pAU`AGp@GhDC`FIhPAxICbCjDNzBh@fBh@t@V[~@_@dAw@xBOp@Kr@Y~Dg@hDYxDY|DAhAU`DWrDQbBc@lCi@|FMvB@v@LvAJ^h@pAr@`Az@v@pA`AxD~BfEhCfEnC|@r@lA~Al@pA\\jA^pB~AvGj@zBRbBFzACrAOdFUhEc@lM@f@Jr@`@dBrAfE~@fDVbBD`AEz@u@jE}@xGCdBJhBVnBpA`ILj@J`AB~@C|@OdAUdAYt@a@t@aDlEiAlBc@fASbAm@~Cm@rDS~Ba@`DS|AG`AAx@DpAPpAXbAd@bAh@|@jBxBzAtBpBdCzC|CzBrB`CnBrB~AfAhA~@rAh@vA\\jA\\~A^tAh@hAr@fA`@d@fBvApBnAhBbApBzAzAz@|An@|FdCj@\\l@j@r@~@f@`Ar@bBVhATjCAlAMzBk@xFWhDE|BUnDe@rFQvBCxAF`B\\nC^xELrAJzBVpFn@nFDlBIhA_@bB_BrDmAbCcApBeDfIwAnDiAlCg@rA[lAO`B?`BBb@N~Bb@zEd@jEJl@\\pAr@dBpAfCtAzBhA~AtBjCxAxAhC~BfCfB|FpEfE`D~CjCpB~Ad@r@b@|@P|@D|@C|@Mx@a@xAgAfCiArBY`@m@xAkAzB{@xAiAfBeHvLoBhDWt@Q~@ItA@pALvAPhAj@|Ap@dAZZhBnAfInFtKdH~KlHxItFdDzB`@^|C`CxIbG|J|G~JvGht@je@vDlC|GjEx@h@bHrE`Y|QzGdEhEvBx@ZdFhBtEjApCf@vEf@`CLxCC~DDrGElIE|UMvGC~c@YpVIj_@WrTK|VI|PKpt@c@bEAdCNXAHFJBl@B^FjECrDGvAFr@OfAQ~Ac@~C}@VYj@W|By@fAWHAvA]bA]fAYrAg@fAWtDeAbEiAzAc@p@ItBy@xFaB|Bu@|DqA`BqAfAg@~Am@vQqFjDcAtAe@pJuCjDmAtBi@nCy@}@}CgB{FqAwEW_AkA^",
        },
        summary: "Ikorodu Rd/Ikorodu-Igbobi Rd/Ikorodu - Lagos Rd/A1",
        warnings: [],
        waypoint_order: [],
      },
    ],
  },
  {
    name: "Static Map",
    method: "GET",
    path: "/api/v1/maps/static",
    description: "Returns a static map image centered on a given location.",
    examples: {
      curl: `curl -X GET "${baseUrl}/api/v1/maps/static?center=6.509700,3.386300&zoom=14&size=400x400&markers=6.509700,3.386300" \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/maps/static?center=6.509700,3.386300&zoom=14&size=400x400&markers=6.509700,3.386300', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/maps/static',
    headers={'Authorization': f'Bearer {token}'},
    params={
        'center': '6.509700,3.386300',
        'zoom': 14,
        'size': '400x400',
        'markers': '6.509700,3.386300'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/maps/static?center=6.509700,3.386300&zoom=14&size=400x400&markers=6.509700,3.386300');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/maps/static?center=6.509700,3.386300&zoom=14&size=400x400&markers=6.509700,3.386300"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      map_url:
        "https://maps.googleapis.com/maps/api/staticmap?center=6.509700,3.386300&zoom=14&size=400x400&markers=6.509700,3.386300",
    },
  },
  {
    name: "Route Planning",
    method: "GET",
    path: "/api/v1/maps/route",
    description:
      "Finds a route between an origin and a destination, with options for travel mode, routing preferences, and avoiding tolls/highways/ferries. Returns encoded and decoded polylines along with distance and duration.",
    examples: {
      curl: `curl -X GET "${baseUrl}/api/v1/maps/route?origin_lat=6.601847&origin_lng=3.351486&destination_lat=6.577369&destination_lng=3.321156&mode=DRIVE&routing_pref=TRAFFIC_AWARE&compute_alternative_routes=false&avoid_tolls=false&avoid_highways=false&avoid_ferries=false&language_code=en-US&units=METRIC" \\
  -H "Authorization: Bearer $TOKEN"`,
      javascript: `const response = await fetch('${baseUrl}/api/v1/maps/route?origin_lat=6.601847&origin_lng=3.351486&destination_lat=6.577369&destination_lng=3.321156&mode=DRIVE&routing_pref=TRAFFIC_AWARE&compute_alternative_routes=false&avoid_tolls=false&avoid_highways=false&avoid_ferries=false&language_code=en-US&units=METRIC', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
});`,
      python: `import requests

response = requests.get(
    '${baseUrl}/api/v1/maps/route',
    headers={'Authorization': f'Bearer {token}'},
    params={
        'origin_lat': 6.601847,
        'origin_lng': 3.351486,
        'destination_lat': 6.577369,
        'destination_lng': 3.321156,
        'mode': 'DRIVE',
        'routing_pref': 'TRAFFIC_AWARE',
        'compute_alternative_routes': False,
        'avoid_tolls': False,
        'avoid_highways': False,
        'avoid_ferries': False,
        'language_code': 'en-US',
        'units': 'METRIC'
    }
)`,
      php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${baseUrl}/api/v1/maps/route?origin_lat=6.601847&origin_lng=3.351486&destination_lat=6.577369&destination_lng=3.321156&mode=DRIVE&routing_pref=TRAFFIC_AWARE&compute_alternative_routes=false&avoid_tolls=false&avoid_highways=false&avoid_ferries=false&language_code=en-US&units=METRIC');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
curl_close($ch);`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${baseUrl}/api/v1/maps/route?origin_lat=6.601847&origin_lng=3.351486&destination_lat=6.577369&destination_lng=3.321156&mode=DRIVE&routing_pref=TRAFFIC_AWARE&compute_alternative_routes=false&avoid_tolls=false&avoid_highways=false&avoid_ferries=false&language_code=en-US&units=METRIC"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
    },
    response: {
      duration: "1229s",
      distance_meters: 8118,
      encoded_polyline: "}khg@_qmSPh@x@c@...",
      decoded_coords: [
        [6.60175, 3.35136],
        [6.60166, 3.35115],
        [6.5774, 3.32116],
      ],
      legs: [
        {
          distanceMeters: 8118,
          duration: "1229s",
          staticDuration: "1103s",
          polyline: {
            encodedPolyline: "}khg@_qmSPh@x@c@...",
          },
          startLocation: {
            latLng: { latitude: 6.6017525, longitude: 3.3513586 },
          },
          endLocation: {
            latLng: { latitude: 6.577403, longitude: 3.3211552 },
          },
          steps: [
            {
              distanceMeters: 25,
              staticDuration: "7s",
              polyline: { encodedPolyline: "}khg@_qmSPh@" },
              navigationInstruction: {
                maneuver: "DEPART",
                instructions:
                  "Head southwest toward Adeleke St\nRestricted usage road",
              },
            },
            {
              distanceMeters: 120,
              staticDuration: "38s",
              polyline: { encodedPolyline: "kkhg@uomSx@c@" },
              navigationInstruction: {
                maneuver: "TURN_LEFT",
                instructions: "Turn left onto Adeleke St",
              },
            },
          ],
          localizedValues: {
            distance: { text: "8.1 km" },
            duration: { text: "20 mins" },
            staticDuration: { text: "18 mins" },
          },
        },
      ],
    },
  },
];

function MapsServiceContent() {
  return (
    <div className="h-full flex flex-col w-full">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hljs, pre, code {
            white-space: pre-wrap !important;
            word-break: break-all !important;
            overflow-wrap: anywhere !important;
            max-width: 100% !important;
          }
        `,
        }}
      />
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Map className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Maps Service
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Location & Navigation
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          This service provides access to static maps, directions, distance
          calculation, routes, and nearby places.
        </p>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            {/* Base Configuration */}
            <section>
              <h2 className="text-base xs:text-lg sm:text-xl md:text-xl font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <Code className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Base Configuration
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Base URL</h3>
                  <code className="text-sm bg-muted px-3 py-2 rounded block">
                    {baseUrl}
                  </code>
                </div>
              </div>
            </section>

            {/* Available Endpoints */}
            <section>
              <h2 className="text-sm xs:text-base sm:text-lg font-semibold mb-2 xs:mb-3 sm:mb-4 flex items-center gap-1 xs:gap-2">
                <Navigation className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                Available Endpoints
              </h2>

              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                {mapsEndpoints.map((endpoint, index) => (
                  <div
                    key={endpoint.path}
                    className="border rounded-lg p-3 sm:p-4 hover:bg-accent/50 transition-colors w-full"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className="text-xs sm:text-sm"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs sm:text-sm bg-muted px-2 py-1 rounded break-all w-full sm:w-auto">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    <h3 className="font-medium mb-1 text-sm sm:text-base lg:text-lg flex items-center gap-2">
                      {index === 0 && <MapPin className="h-4 w-4" />}
                      {index === 1 && <Route className="h-4 w-4" />}
                      {index === 2 && <Navigation className="h-4 w-4" />}
                      {index === 3 && <Camera className="h-4 w-4" />}
                      {index === 4 && <Map className="h-4 w-4" />}
                      {endpoint.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">
                      {endpoint.description}
                    </p>

                    <div className="space-y-4 w-full">
                      {/* Parameters Table for each endpoint */}
                      <div>
                        <h4 className="font-medium mb-2">Query Parameters:</h4>
                        <div className="overflow-x-auto">
                          <table className="max-w-3xl text-sm border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-muted">
                                <th className="border border-gray-300 px-2 py-1 text-left">
                                  Parameter
                                </th>
                                <th className="border border-gray-300 px-2 py-1 text-left">
                                  Type
                                </th>
                                <th className="border border-gray-300 px-2 py-1 text-left">
                                  Required
                                </th>
                                <th className="border border-gray-300 px-2 py-1 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {index === 0 && (
                                <>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      lat
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      float
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Latitude coordinate
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      lng
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      float
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Longitude coordinate
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      radius
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      int
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Search radius in meters (default: 2000)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      type
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Place type (default: &quot;hospital&quot;)
                                    </td>
                                  </tr>
                                </>
                              )}
                              {index === 1 && (
                                <>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      origin
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Starting point (address or lat,lng)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      destination
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Destination (address or lat,lng)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      mode
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Travel mode (default: &quot;driving&quot;)
                                    </td>
                                  </tr>
                                </>
                              )}
                              {index === 2 && (
                                <>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      origin
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Starting point (address or lat,lng)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      destination
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Destination point (address or lat,lng)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      mode
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Travel mode (default: &quot;driving&quot;)
                                    </td>
                                  </tr>
                                </>
                              )}
                              {index === 3 && (
                                <>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      center
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Map center point (Latitude,Longitude)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      zoom
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      int
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Map zoom level (default: 14)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      size
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Map image size (default: 400x400)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      markers
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Markers to place on map (repeatable)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      path
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Path coordinates to draw on map
                                      (repeatable)
                                    </td>
                                  </tr>
                                </>
                              )}
                              {index === 4 && (
                                <>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      origin
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Starting point (address or lat,lng)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      destination
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ✅
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Destination point (address or lat,lng)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="border border-gray-300 px-2 py-1">
                                      mode
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      string
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      ❌
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">
                                      Travel mode (default: &quot;driving&quot;)
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        className="w-full overflow-hidden"
                        style={{
                          wordBreak: "break-all",
                          overflowWrap: "anywhere",
                        }}
                      >
                        <LanguageSelector
                          examples={endpoint.examples}
                          title="Request Example"
                        />
                      </div>
                      {endpoint.response && (
                        <div className="w-full break-words">
                          <h4 className="text-sm sm:text-base font-medium mb-2">
                            Response Example
                          </h4>
                          <div
                            className="w-full overflow-hidden"
                            style={{
                              wordBreak: "break-all",
                              overflowWrap: "anywhere",
                            }}
                          >
                            <CodeBlock
                              code={
                                typeof endpoint.response === "string"
                                  ? endpoint.response
                                  : JSON.stringify(endpoint.response, null, 2)
                              }
                              language={
                                typeof endpoint.response === "string"
                                  ? "text"
                                  : "json"
                              }
                              title="200 OK Response"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Query Parameter Meanings */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Query Parameter Meanings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Travel Modes</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        driving
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        walking
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        bicycling
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        transit
                      </code>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Place Types</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        hospital
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        restaurant
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        gasstation
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">bank</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Response Formats */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Response Formats</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <h3 className="font-medium mb-2">JSON Responses</h3>
                  <p className="text-sm text-muted-foreground">
                    Most endpoints return structured JSON data with location
                    information, distances, and route details.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium mb-2">Binary Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Static map endpoint returns PNG/JPEG image data for direct
                    display or download.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <PageNavigation {...getNavigation("/introduction/services/maps")} />
      </div>
    </div>
  );
}

export default function MapsServicePage() {
  return (
    <SuspenseWrapper>
      <MapsServiceContent />
    </SuspenseWrapper>
  );
}
