// MAPS
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface MapsParamsProps {
  endpoint: string;
  onParamsChange: (params: URLSearchParams) => void;
}

export function MapsParams({ endpoint, onParamsChange }: MapsParamsProps) {
  const [params, setParams] = useState<Record<string, string | string[]>>({});

  const getEndpointType = () => {
    if (endpoint.includes("/nearby")) return "nearby";
    if (endpoint.includes("/distance")) return "distance";
    if (endpoint.includes("/directions")) return "directions";
    if (endpoint.includes("/static")) return "static";
    return null;
  };

  const endpointType = getEndpointType();

  useEffect(() => {
    // Initialize default values based on endpoint type
    const defaults: Record<string, string | string[]> = {};

    switch (endpointType) {
      case "nearby":
        defaults.keyword = "hospital";
        defaults.radius_m = "2000";
        break;
      case "distance":
        defaults.mode = "driving";
        break;
      case "directions":
        defaults.mode = "driving";
        break;
      case "static":
        defaults.zoom = "14";
        defaults.size = "600x400";
        defaults.markers = [];
        defaults.path = [];
        break;
    }

    setParams(defaults);
  }, [endpointType]);

  useEffect(() => {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => v && urlParams.append(key, v));
      } else if (value) {
        urlParams.set(key, value);
      }
    });

    onParamsChange(urlParams);
  }, [params, onParamsChange]);

  const updateParam = (key: string, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const updateArrayParam = (key: string, index: number, value: string) => {
    setParams((prev) => {
      const array = Array.isArray(prev[key])
        ? [...(prev[key] as string[])]
        : [];
      array[index] = value;
      return { ...prev, [key]: array };
    });
  };

  const addArrayItem = (key: string) => {
    setParams((prev) => {
      const array = Array.isArray(prev[key])
        ? [...(prev[key] as string[])]
        : [];
      array.push("");
      return { ...prev, [key]: array };
    });
  };

  const removeArrayItem = (key: string, index: number) => {
    setParams((prev) => {
      const array = Array.isArray(prev[key])
        ? [...(prev[key] as string[])]
        : [];
      array.splice(index, 1);
      return { ...prev, [key]: array };
    });
  };

  if (!endpointType) return null;

  const renderNearbyParams = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Latitude *</label>
          <input
            type="number"
            step="any"
            value={params.lat || ""}
            onChange={(e) => updateParam("lat", e.target.value)}
            placeholder="e.g., 37.421655"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Longitude *</label>
          <input
            type="number"
            step="any"
            value={params.lng || ""}
            onChange={(e) => updateParam("lng", e.target.value)}
            placeholder="e.g., -122.085637"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Keyword</label>
        <input
          value={params.keyword || ""}
          onChange={(e) => updateParam("keyword", e.target.value)}
          placeholder="hospital"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Radius (meters)</label>
        <input
          type="number"
          value={params.radius_m || ""}
          onChange={(e) => updateParam("radius_m", e.target.value)}
          placeholder="2000"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    </div>
  );

  const renderDistanceParams = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Origin *</label>
        <input
          value={params.origin || ""}
          onChange={(e) => updateParam("origin", e.target.value)}
          placeholder="Address or lat,lng"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Destination *</label>
        <input
          value={params.destination || ""}
          onChange={(e) => updateParam("destination", e.target.value)}
          placeholder="Address or lat,lng"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Mode</label>
        <input
          value={params.mode || ""}
          onChange={(e) => updateParam("mode", e.target.value)}
          placeholder="driving"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    </div>
  );

  const renderDirectionsParams = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Origin *</label>
        <input
          value={params.origin || ""}
          onChange={(e) => updateParam("origin", e.target.value)}
          placeholder="Origin address or lat,lng"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Destination *</label>
        <input
          value={params.destination || ""}
          onChange={(e) => updateParam("destination", e.target.value)}
          placeholder="Destination address or lat,lng"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Mode</label>
        <input
          value={params.mode || ""}
          onChange={(e) => updateParam("mode", e.target.value)}
          placeholder="driving, walking, bicycling, transit"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    </div>
  );

  const renderStaticParams = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Center *</label>
        <input
          value={params.center || ""}
          onChange={(e) => updateParam("center", e.target.value)}
          placeholder="37.421655,-122.085637"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Zoom Level</label>
          <input
            type="number"
            value={params.zoom || ""}
            onChange={(e) => updateParam("zoom", e.target.value)}
            placeholder="14"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Size</label>
          <input
            value={params.size || ""}
            onChange={(e) => updateParam("size", e.target.value)}
            placeholder="600x400"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Markers</label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("markers")}
            >
              <Plus className="h-4 w-4" />
            </Button>
            {Array.isArray(params.markers) && params.markers.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  removeArrayItem("markers", params.markers.length - 1)
                }
                className="sm:hidden"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {Array.isArray(params.markers) &&
          params.markers.map((marker, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={marker}
                onChange={(e) =>
                  updateArrayParam("markers", index, e.target.value)
                }
                placeholder="37.421655,-122.085637"
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem("markers", index)}
                className="hidden sm:flex"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Path Coordinates</label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("path")}
            >
              <Plus className="h-4 w-4" />
            </Button>
            {Array.isArray(params.path) && params.path.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem("path", params.path.length - 1)}
                className="sm:hidden"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {Array.isArray(params.path) &&
          params.path.map((pathCoord, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={pathCoord}
                onChange={(e) =>
                  updateArrayParam("path", index, e.target.value)
                }
                placeholder="37.421655,-122.085637"
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem("path", index)}
                className="hidden sm:flex"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Maps Parameters</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Configure parameters for the {endpointType} endpoint
        </p>
      </div>

      {endpointType === "nearby" && renderNearbyParams()}
      {endpointType === "distance" && renderDistanceParams()}
      {endpointType === "directions" && renderDirectionsParams()}
      {endpointType === "static" && renderStaticParams()}
    </div>
  );
}
