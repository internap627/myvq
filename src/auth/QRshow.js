import React, { useEffect } from "react";
import QRCode from "qrcode";

export default function QRshow({ data }) {
    useEffect( () => {
        data && generateQR()
    })

    const generateQR = () => {
        let str = data && data
        QRCode.toCanvas(document.getElementById('canvas'), str, function(error) {
        if (error) console.error(error)
        })
        }
  return (
    <div>
      <canvas id="canvas" align="center" />
    </div>
  );
}
