import { QRCodeSVG } from 'qrcode.react';

// Composant d'affichage de code QR
const QRCodeDisplay = ({ 
  value, 
  size = 200, 
  level = 'M',
  includeMargin = true,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  className = '',
  title
}) => {
  // Vérification que la valeur existe
  if (!value) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} 
           style={{ width: size, height: size }}>
        <p className="text-gray-400 text-sm text-center px-4">
          Aucune donnée à afficher
        </p>
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`}>
      {/* Titre optionnel */}
      {title && (
        <div className="text-center mb-2 font-medium text-gray-700">
          {title}
        </div>
      )}
      
      {/* Code QR */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 inline-block">
        <QRCodeSVG
          value={value}
          size={size}
          level={level}
          includeMargin={includeMargin}
          fgColor={fgColor}
          bgColor={bgColor}
        />
      </div>
    </div>
  );
};

export default QRCodeDisplay;
