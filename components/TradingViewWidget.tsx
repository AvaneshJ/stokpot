// TradingViewWidget.jsx
"use client";
import useTradingViewWidget from "@/hooks/UseTradingViewWidget";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  classname?: string;
}

function TradingViewWidget({
  title,
  scriptUrl,
  config,
  height,
  classname,
}: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}
      <div
        className={cn("tradingview-widget-container", classname)}
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        ></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
