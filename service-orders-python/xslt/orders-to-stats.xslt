<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:o="http://canteen.com/order">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <!-- Template principal pour les statistiques -->
    <xsl:template match="/o:orders">
        <html>
            <head>
                <title>Statistiques des Commandes</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 1200px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .stats-container {
                        background-color: white;
                        padding: 40px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #2c3e50;
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 20px;
                        margin-bottom: 40px;
                    }
                    .stat-card {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 25px;
                        border-radius: 8px;
                        text-align: center;
                    }
                    .stat-card.green {
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                    }
                    .stat-card.orange {
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    }
                    .stat-card.blue {
                        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    }
                    .stat-value {
                        font-size: 36px;
                        font-weight: bold;
                        margin: 10px 0;
                    }
                    .stat-label {
                        font-size: 14px;
                        text-transform: uppercase;
                        opacity: 0.9;
                    }
                    .orders-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 30px;
                    }
                    .orders-table th {
                        background-color: #3498db;
                        color: white;
                        padding: 15px;
                        text-align: left;
                        font-weight: bold;
                    }
                    .orders-table td {
                        padding: 12px 15px;
                        border-bottom: 1px solid #ddd;
                    }
                    .orders-table tr:hover {
                        background-color: #f9f9f9;
                    }
                    .status-badge {
                        display: inline-block;
                        padding: 5px 12px;
                        border-radius: 15px;
                        font-size: 11px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .status-pending { background-color: #f39c12; color: white; }
                    .status-preparing { background-color: #3498db; color: white; }
                    .status-ready { background-color: #27ae60; color: white; }
                    .status-completed { background-color: #95a5a6; color: white; }
                    .status-cancelled { background-color: #e74c3c; color: white; }
                    .total-amount {
                        font-weight: bold;
                        color: #27ae60;
                    }
                </style>
            </head>
            <body>
                <div class="stats-container">
                    <h1>Statistiques des Commandes</h1>
                    
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-label">Total Commandes</div>
                            <div class="stat-value">
                                <xsl:value-of select="count(o:order)"/>
                            </div>
                        </div>
                        
                        <div class="stat-card green">
                            <div class="stat-label">Revenu Total</div>
                            <div class="stat-value">
                                <xsl:value-of select="format-number(sum(o:order/o:total), '#,##0.00')"/> €
                            </div>
                        </div>
                        
                        <div class="stat-card orange">
                            <div class="stat-label">Commandes Complétées</div>
                            <div class="stat-value">
                                <xsl:value-of select="count(o:order[o:status='completed'])"/>
                            </div>
                        </div>
                        
                        <div class="stat-card blue">
                            <div class="stat-label">En Attente</div>
                            <div class="stat-value">
                                <xsl:value-of select="count(o:order[o:status='pending'])"/>
                            </div>
                        </div>
                    </div>
                    
                    <h2 style="color: #2c3e50; margin-top: 40px; margin-bottom: 20px;">
                        Liste des Commandes
                    </h2>
                    
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Utilisateur</th>
                                <th>Date</th>
                                <th>Articles</th>
                                <th>Statut</th>
                                <th style="text-align: right;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="o:order">
                                <xsl:sort select="o:created_at" order="descending"/>
                                <tr>
                                    <td>#<xsl:value-of select="o:id"/></td>
                                    <td>User #<xsl:value-of select="o:user_id"/></td>
                                    <td><xsl:value-of select="substring(o:created_at, 1, 16)"/></td>
                                    <td>
                                        <xsl:value-of select="count(o:items/o:item)"/> article(s)
                                    </td>
                                    <td>
                                        <span class="status-badge status-{o:status}">
                                            <xsl:value-of select="o:status"/>
                                        </span>
                                    </td>
                                    <td class="total-amount" style="text-align: right;">
                                        <xsl:value-of select="format-number(o:total, '#,##0.00')"/> €
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>
