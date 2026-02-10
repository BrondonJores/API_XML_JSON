import { QRCodeSVG } from 'qrcode.react'

function QRCodeDisplay({ value, size = 200 }) {
  return (
    <div className="flex justify-center p-4">
      <QRCodeSVG value={value} size={size} level="H" />
    </div>
  )
}

export default QRCodeDisplay
