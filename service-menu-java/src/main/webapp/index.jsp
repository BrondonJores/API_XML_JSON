<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Menu Cantine - API REST</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            padding: 40px;
            max-width: 900px;
            width: 100%;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5em;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        
        h2 {
            color: #667eea;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        
        .endpoint {
            background: #f8f9fa;
            padding: 12px 15px;
            margin: 8px 0;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            border-left: 3px solid #28a745;
        }
        
        .endpoint.post {
            border-left-color: #007bff;
        }
        
        .endpoint.put {
            border-left-color: #ffc107;
        }
        
        .endpoint.delete {
            border-left-color: #dc3545;
        }
        
        .method {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.85em;
            margin-right: 10px;
        }
        
        .method.get {
            background: #28a745;
            color: white;
        }
        
        .method.post {
            background: #007bff;
            color: white;
        }
        
        .method.put {
            background: #ffc107;
            color: #333;
        }
        
        .method.delete {
            background: #dc3545;
            color: white;
        }
        
        .description {
            color: #666;
            font-size: 0.9em;
            margin-top: 5px;
            font-family: 'Segoe UI', sans-serif;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .feature {
            background: #667eea;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
        }
        
        code {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Service Menu Cantine</h1>
        <p class="subtitle">API REST pour la gestion des menus avec support XML et JSON</p>
        
        <div class="info-box">
            <strong>Version:</strong> 1.0.0<br>
            <strong>Status:</strong> <span style="color: #28a745;">Actif</span><br>
            <strong>Formats supportes:</strong> XML, JSON
        </div>
        
        <div class="features">
            <div class="feature">Support XML & JSON</div>
            <div class="feature">Validation XSD</div>
            <div class="feature">Transformation XSLT</div>
            <div class="feature">API RESTful</div>
        </div>
        
        <h2>Endpoints disponibles</h2>
        
        <h3 style="color: #555; margin-top: 20px;">Gestion des plats</h3>
        <div class="endpoint">
            <span class="method get">GET</span> /api/meals
            <div class="description">Recuperer tous les plats</div>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/meals/{id}
            <div class="description">Recuperer un plat specifique</div>
        </div>
        <div class="endpoint post">
            <span class="method post">POST</span> /api/meals
            <div class="description">Creer un nouveau plat</div>
        </div>
        <div class="endpoint put">
            <span class="method put">PUT</span> /api/meals/{id}
            <div class="description">Mettre a jour un plat</div>
        </div>
        <div class="endpoint delete">
            <span class="method delete">DELETE</span> /api/meals/{id}
            <div class="description">Supprimer un plat</div>
        </div>
        
        <h3 style="color: #555; margin-top: 20px;">Gestion des categories</h3>
        <div class="endpoint">
            <span class="method get">GET</span> /api/categories
            <div class="description">Recuperer toutes les categories</div>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/categories/{id}
            <div class="description">Recuperer une categorie specifique</div>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/meals/category/{id}
            <div class="description">Recuperer les plats d'une categorie</div>
        </div>
        
        <h3 style="color: #555; margin-top: 20px;">Menu</h3>
        <div class="endpoint">
            <span class="method get">GET</span> /api/menu/today
            <div class="description">Recuperer le menu du jour</div>
        </div>
        
        <h3 style="color: #555; margin-top: 20px;">Export</h3>
        <div class="endpoint">
            <span class="method get">GET</span> /api/meals/export/xml
            <div class="description">Exporter tous les plats en XML</div>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> /api/meals/export/json
            <div class="description">Exporter tous les plats en JSON</div>
        </div>
        
        <h3 style="color: #555; margin-top: 20px;">Validation et transformation</h3>
        <div class="endpoint post">
            <span class="method post">POST</span> /api/validate/xml?schema=meal
            <div class="description">Valider un XML contre un schema XSD</div>
        </div>
        <div class="endpoint post">
            <span class="method post">POST</span> /api/transform/menu-to-html
            <div class="description">Transformer un menu en HTML</div>
        </div>
        <div class="endpoint post">
            <span class="method post">POST</span> /api/transform/meal-to-pdf
            <div class="description">Transformer un plat en format PDF</div>
        </div>
        
        <h3 style="color: #555; margin-top: 20px;">Health Check</h3>
        <div class="endpoint">
            <span class="method get">GET</span> /api/health
            <div class="description">Verifier l'etat du service</div>
        </div>
        
        <div class="info-box" style="margin-top: 30px;">
            <strong>Note:</strong> Utilisez le header <code>Accept: application/xml</code> ou 
            <code>Accept: application/json</code> pour specifier le format de reponse desire.
        </div>
        
        <div class="footer">
            <p>&copy; <%= new java.util.Date().getYear() + 1900 %> Service Menu Cantine</p>
            <p style="margin-top: 5px; font-size: 0.9em;">API REST avec Jakarta EE et JAXB</p>
        </div>
    </div>
</body>
</html>
