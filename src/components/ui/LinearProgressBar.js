// src/components/LinearProgressBar.js

import React from "react";

/**
 * Komponen Progress Bar tipis (Linear) yang menggunakan animasi pulse.
 * @param {object} props
 * @param {string} [props.color='indigo'] - Warna progress bar (tailwind color name)
 * @param {boolean} [props.isLoading=true] - Status loading. Jika false, komponen tidak dirender.
 */
const LinearProgressBar = ({ color = "red", isLoading = true }) => {
  if (!isLoading) return null; // Jangan render jika tidak loading

  return (
    <div
      className="absolute top-0 left-0 right-0 h-1 z-20"
      style={{ overflow: "hidden" }}
    >
      {/* Bar yang sebenarnya, menggunakan warna dan animasi pulse/loading */}
      <div
        className={`h-1 bg-${color}-500 rounded-full opacity-75 animate-pulse`}
      >
        {/* Kosongkan, hanya untuk display */}
      </div>
    </div>
  );
};

export default LinearProgressBar;
