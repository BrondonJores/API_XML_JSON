<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Menu - Cantine Intelligente</title>
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
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 100%;
        }
        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 10px;
            font-size: 2.5em;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 40px;
            font-size: 1.1em;
        }
        .status {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin-bottom: 30px;
            border-radius: 4px;
        }
        .status-title {
            color: #2e7d32;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .endpoints {
            margin-top: 30px;
        }
        .endpoint-section {
            margin-bottom: 25px;
        }
        .endpoint-section h3 {
            color: #667eea;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }
        .endpoint {
            background: #f5f5f5;
            padding: 12px 15px;
            margin-bottom: 10px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            transition: all 0.3s;
        }
        .endpoint:hover {
            background: #e8eaf6;
            transform: translateX(5px);
        }
        .method {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.85em;
            margin-right: 15px;
            min-width: 60px;
            text-align: center;
        }
        .method.get { background: #4caf50; color: white; }
        .method.post { background: #2196f3; color: white; }
        .method.put { background: #ff9800; color: white; }
        .method.delete { background: #f44336; color: white; }
        .path {
            font-family: 'Courier New', monospace;
            color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
        }
        .badge {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            margin: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Service Menu</h1>
        <p class="subtitle">Gestion des Plats et Menus - Cantine Intelligente</p>
        
        <div class="status">
            <div class="status-title">Statut du Service</div>
            <div>Le service est operationnel et pret a recevoir des requetes</div>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <span class="badge">Java 11</span>
            <span class="badge">Servlets 4.0</span>
            <span class="badge">JDBC</span>
            <span class="badge">XML/JSON</span>
            <span class="badge">XSLT</span>
        </div>
        
        <div class="endpoints">
            <div class="endpoint-section">
                <h3>Gestion des Plats</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/meals</span>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/meals/{id}</span>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="path">/api/meals</span>
                </div>
                <div class="endpoint">
                    <span class="method put">PUT</span>
                    <span class="path">/api/meals/{id}</span>
                </div>
                <div class="endpoint">
                    <span class="method delete">DELETE</span>
                    <span class="path">/api/meals/{id}</span>
                </div>
            </div>
            
            <div class="endpoint-section">
                <h3>Categories et Menu</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/categories</span>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/meals/category/{id}</span>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/menu/today</span>
                </div>
            </div>
            
            <div class="endpoint-section">
                <h3>Export et Validation</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/meals/export/xml</span>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/meals/export/json</span>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="path">/api/validate/xml</span>
                </div>
            </div>
            
            <div class="endpoint-section">
                <h3>Transformations XSLT</h3>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="path">/api/transform/menu-to-html</span>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="path">/api/transform/meal-to-pdf</span>
                </div>
            </div>
            
            <div class="endpoint-section">
                <h3>Monitoring</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="path">/api/health</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            Version 1.0.0 - Cantine Intelligente
        </div>
    </div>
</body>
</html>
