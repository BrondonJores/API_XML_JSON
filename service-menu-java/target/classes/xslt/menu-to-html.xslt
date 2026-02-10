<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:menu="http://canteen.com/menu"
                xmlns:meal="http://canteen.com/meal"
                exclude-result-prefixes="menu meal">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/menu:menu">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Menu du <xsl:value-of select="menu:date"/></title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .menu-header {
                        text-align: center;
                        background-color: #2c3e50;
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                    }
                    .menu-title {
                        font-size: 2.5em;
                        margin: 0;
                    }
                    .menu-date {
                        font-size: 1.2em;
                        margin-top: 10px;
                    }
                    .category-section {
                        background-color: white;
                        padding: 20px;
                        margin-bottom: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .category-title {
                        color: #e74c3c;
                        border-bottom: 2px solid #e74c3c;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .meal-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                    }
                    .meal-card {
                        border: 1px solid #ddd;
                        padding: 15px;
                        border-radius: 5px;
                        background-color: #fafafa;
                    }
                    .meal-name {
                        font-weight: bold;
                        font-size: 1.2em;
                        color: #2c3e50;
                        margin-bottom: 10px;
                    }
                    .meal-description {
                        color: #666;
                        margin-bottom: 10px;
                        font-size: 0.9em;
                    }
                    .meal-price {
                        color: #27ae60;
                        font-size: 1.3em;
                        font-weight: bold;
                    }
                    .meal-available {
                        background-color: #27ae60;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 0.8em;
                    }
                    .meal-unavailable {
                        background-color: #e74c3c;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 0.8em;
                    }
                    .nutritional-info {
                        margin-top: 10px;
                        font-size: 0.85em;
                        color: #666;
                    }
                    .allergens {
                        margin-top: 5px;
                        color: #e74c3c;
                        font-size: 0.8em;
                    }
                </style>
            </head>
            <body>
                <div class="menu-header">
                    <h1 class="menu-title"><xsl:value-of select="menu:title"/></h1>
                    <p class="menu-date">Date: <xsl:value-of select="menu:date"/></p>
                    <xsl:if test="menu:description">
                        <p><xsl:value-of select="menu:description"/></p>
                    </xsl:if>
                </div>
                
                <xsl:apply-templates select="menu:categories/menu:category"/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="menu:category">
        <div class="category-section">
            <h2 class="category-title"><xsl:value-of select="menu:name"/></h2>
            <xsl:if test="menu:description">
                <p><xsl:value-of select="menu:description"/></p>
            </xsl:if>
            <div class="meal-grid">
                <xsl:apply-templates select="menu:meals/meal:meal"/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="meal:meal">
        <div class="meal-card">
            <div class="meal-name"><xsl:value-of select="meal:name"/></div>
            <xsl:if test="meal:description">
                <div class="meal-description"><xsl:value-of select="meal:description"/></div>
            </xsl:if>
            <div class="meal-price"><xsl:value-of select="meal:price"/> EUR</div>
            <div>
                <xsl:choose>
                    <xsl:when test="meal:available = 'true'">
                        <span class="meal-available">Disponible</span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span class="meal-unavailable">Indisponible</span>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <xsl:if test="meal:nutritionalInfo">
                <div class="nutritional-info">
                    Calories: <xsl:value-of select="meal:nutritionalInfo/meal:calories"/> kcal |
                    Proteines: <xsl:value-of select="meal:nutritionalInfo/meal:protein"/>g |
                    Glucides: <xsl:value-of select="meal:nutritionalInfo/meal:carbs"/>g |
                    Lipides: <xsl:value-of select="meal:nutritionalInfo/meal:fat"/>g
                </div>
            </xsl:if>
            <xsl:if test="meal:allergens/meal:allergen">
                <div class="allergens">
                    Allergenes: <xsl:for-each select="meal:allergens/meal:allergen">
                        <xsl:value-of select="."/>
                        <xsl:if test="position() != last()">, </xsl:if>
                    </xsl:for-each>
                </div>
            </xsl:if>
        </div>
    </xsl:template>
    
</xsl:stylesheet>
