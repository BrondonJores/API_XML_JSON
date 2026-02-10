<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:m="http://canteen.com/meal"
    xmlns:fo="http://www.w3.org/1999/XSL/Format">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
    
    <!-- Template principal pour un plat -->
    <xsl:template match="/m:meal">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="meal-page"
                    page-height="297mm" page-width="210mm"
                    margin-top="20mm" margin-bottom="20mm"
                    margin-left="20mm" margin-right="20mm">
                    <fo:region-body margin-top="0mm" margin-bottom="15mm"/>
                    <fo:region-after extent="15mm"/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            
            <fo:page-sequence master-reference="meal-page">
                <fo:static-content flow-name="xsl-region-after">
                    <fo:block text-align="center" font-size="10pt" color="#7f8c8d">
                        <xsl:text>Cantine Intelligente - Fiche Produit</xsl:text>
                    </fo:block>
                </fo:static-content>
                
                <fo:flow flow-name="xsl-region-body">
                    <!-- En-tete -->
                    <fo:block font-size="24pt" font-weight="bold" color="#2c3e50" 
                        space-after="5mm" text-align="center">
                        <xsl:value-of select="m:name"/>
                    </fo:block>
                    
                    <!-- Prix -->
                    <fo:block font-size="18pt" font-weight="bold" color="#27ae60" 
                        space-after="10mm" text-align="center">
                        <xsl:value-of select="m:price"/>
                        <xsl:text> €</xsl:text>
                    </fo:block>
                    
                    <!-- Description -->
                    <fo:block font-size="12pt" space-after="10mm" 
                        border="1pt solid #ddd" padding="5mm" background-color="#f9f9f9">
                        <fo:block font-weight="bold" space-after="3mm" color="#3498db">
                            <xsl:text>Description</xsl:text>
                        </fo:block>
                        <fo:block>
                            <xsl:value-of select="m:description"/>
                        </fo:block>
                    </fo:block>
                    
                    <!-- Informations nutritionnelles -->
                    <xsl:if test="m:nutritionalInfo">
                        <fo:block font-size="12pt" space-after="10mm"
                            border="1pt solid #ddd" padding="5mm">
                            <fo:block font-weight="bold" space-after="3mm" color="#3498db">
                                <xsl:text>Informations Nutritionnelles</xsl:text>
                            </fo:block>
                            <fo:table table-layout="fixed" width="100%">
                                <fo:table-column column-width="50%"/>
                                <fo:table-column column-width="50%"/>
                                <fo:table-body>
                                    <fo:table-row>
                                        <fo:table-cell padding="2mm">
                                            <fo:block>Calories:</fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell padding="2mm">
                                            <fo:block font-weight="bold">
                                                <xsl:value-of select="m:nutritionalInfo/m:calories"/>
                                                <xsl:text> kcal</xsl:text>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                                    <fo:table-row>
                                        <fo:table-cell padding="2mm">
                                            <fo:block>Proteines:</fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell padding="2mm">
                                            <fo:block font-weight="bold">
                                                <xsl:value-of select="m:nutritionalInfo/m:protein"/>
                                                <xsl:text> g</xsl:text>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                                    <fo:table-row>
                                        <fo:table-cell padding="2mm">
                                            <fo:block>Glucides:</fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell padding="2mm">
                                            <fo:block font-weight="bold">
                                                <xsl:value-of select="m:nutritionalInfo/m:carbs"/>
                                                <xsl:text> g</xsl:text>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                                    <fo:table-row>
                                        <fo:table-cell padding="2mm">
                                            <fo:block>Lipides:</fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell padding="2mm">
                                            <fo:block font-weight="bold">
                                                <xsl:value-of select="m:nutritionalInfo/m:fat"/>
                                                <xsl:text> g</xsl:text>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                                    <fo:table-row>
                                        <fo:table-cell padding="2mm">
                                            <fo:block>Fibres:</fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell padding="2mm">
                                            <fo:block font-weight="bold">
                                                <xsl:value-of select="m:nutritionalInfo/m:fiber"/>
                                                <xsl:text> g</xsl:text>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                                    <fo:table-row>
                                        <fo:table-cell padding="2mm">
                                            <fo:block>Sodium:</fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell padding="2mm">
                                            <fo:block font-weight="bold">
                                                <xsl:value-of select="m:nutritionalInfo/m:sodium"/>
                                                <xsl:text> mg</xsl:text>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                                </fo:table-body>
                            </fo:table>
                        </fo:block>
                    </xsl:if>
                    
                    <!-- Allergenes -->
                    <xsl:if test="m:allergens/m:allergen">
                        <fo:block font-size="12pt" space-after="10mm"
                            border="1pt solid #e74c3c" padding="5mm" background-color="#fee">
                            <fo:block font-weight="bold" space-after="3mm" color="#e74c3c">
                                <xsl:text>Allergenes</xsl:text>
                            </fo:block>
                            <xsl:for-each select="m:allergens/m:allergen">
                                <fo:block space-after="2mm">
                                    <xsl:text>- </xsl:text>
                                    <xsl:value-of select="m:allergenName"/>
                                </fo:block>
                            </xsl:for-each>
                        </fo:block>
                    </xsl:if>
                    
                    <!-- Disponibilite -->
                    <fo:block font-size="11pt" space-after="5mm">
                        <fo:inline font-weight="bold">
                            <xsl:text>Disponibilite: </xsl:text>
                        </fo:inline>
                        <xsl:choose>
                            <xsl:when test="m:available = 'true'">
                                <fo:inline color="#27ae60">Disponible</fo:inline>
                            </xsl:when>
                            <xsl:otherwise>
                                <fo:inline color="#e74c3c">Non disponible</fo:inline>
                            </xsl:otherwise>
                        </xsl:choose>
                    </fo:block>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>
    
</xsl:stylesheet>
