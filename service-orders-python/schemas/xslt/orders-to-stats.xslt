<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:order="http://canteen.com/order"
                exclude-result-prefixes="order">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/order:orders">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Statistiques des Commandes</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .header {
                        text-align: center;
                        color: #2c3e50;
                        margin-bottom: 40px;
                    }
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 20px;
                        margin-bottom: 40px;
                    }
                    .stat-card {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        text-align: center;
                    }
                    .stat-value {
                        font-size: 2.5em;
                        font-weight: bold;
                        color: #3498db;
                        margin: 10px 0;
                    }
                    .stat-label {
                        color: #7f8c8d;
                        font-size: 1.1em;
                    }
                    .orders-table {
                        background: white;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th {
                        background-color: #34495e;
                        color: white;
                        padding: 12px;
                        text-align: left;
                    }
                    td {
                        padding: 10px;
                        border-bottom: 1px solid #ecf0f1;
                    }
                    tr:hover {
                        background-color: #f8f9fa;
                    }
                    .status-badge {
                        padding: 5px 10px;
                        border-radius: 12px;
                        font-size: 0.85em;
                        font-weight: bold;
                    }
                    .status-pending { background-color: #f39c12; color: white; }
                    .status-preparing { background-color: #3498db; color: white; }
                    .status-ready { background-color: #2ecc71; color: white; }
                    .status-completed { background-color: #27ae60; color: white; }
                    .status-cancelled { background-color: #e74c3c; color: white; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Statistiques des Commandes</h1>
                    <p>Vue d'ensemble de toutes les commandes</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Commandes</div>
                        <div class="stat-value">
                            <xsl:value-of select="count(order:order)"/>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Revenu Total</div>
                        <div class="stat-value">
                            <xsl:value-of select="format-number(sum(order:order/order:total), '#,##0.00')"/> EUR
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Ticket Moyen</div>
                        <div class="stat-value">
                            <xsl:value-of select="format-number(sum(order:order/order:total) div count(order:order), '#,##0.00')"/> EUR
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Articles Vendus</div>
                        <div class="stat-value">
                            <xsl:value-of select="sum(order:order/order:items/order:item/order:quantity)"/>
                        </div>
                    </div>
                </div>
                
                <div class="orders-table">
                    <h2>Liste des Commandes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Utilisateur</th>
                                <th>Articles</th>
                                <th>Total</th>
                                <th>Statut</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:apply-templates select="order:order"/>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="order:order">
        <tr>
            <td>#<xsl:value-of select="order:id"/></td>
            <td>User <xsl:value-of select="order:userId"/></td>
            <td><xsl:value-of select="count(order:items/order:item)"/> article(s)</td>
            <td><xsl:value-of select="format-number(order:total, '#,##0.00')"/> EUR</td>
            <td>
                <span class="status-badge status-{order:status}">
                    <xsl:value-of select="order:status"/>
                </span>
            </td>
            <td><xsl:value-of select="order:createdAt"/></td>
        </tr>
    </xsl:template>
    
</xsl:stylesheet>
