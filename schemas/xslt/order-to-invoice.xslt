<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:order="http://canteen.com/order"
    xmlns:fo="http://www.w3.org/1999/XSL/Format">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
    
    <!-- Template principal pour la facture -->
    <xsl:template match="/order:order">
        <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
            <fo:layout-master-set>
                <fo:simple-page-master master-name="facture" page-height="297mm" page-width="210mm" margin="20mm">
                    <fo:region-body/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            
            <fo:page-sequence master-reference="facture">
                <fo:flow flow-name="xsl-region-body">
                    
                    <!-- En-tete -->
                    <fo:block font-size="24pt" font-weight="bold" text-align="center" margin-bottom="20mm">
                        FACTURE - Cantine Intelligente
                    </fo:block>
                    
                    <!-- Informations commande -->
                    <fo:block font-size="12pt" margin-bottom="5mm">
                        <fo:inline font-weight="bold">Numero de commande: </fo:inline>
                        <xsl:value-of select="order:id"/>
                    </fo:block>
                    
                    <fo:block font-size="12pt" margin-bottom="5mm">
                        <fo:inline font-weight="bold">Date: </fo:inline>
                        <xsl:value-of select="order:createdAt"/>
                    </fo:block>
                    
                    <fo:block font-size="12pt" margin-bottom="5mm">
                        <fo:inline font-weight="bold">Heure de retrait: </fo:inline>
                        <xsl:value-of select="order:pickupTime"/>
                    </fo:block>
                    
                    <fo:block font-size="12pt" margin-bottom="10mm">
                        <fo:inline font-weight="bold">Statut: </fo:inline>
                        <xsl:value-of select="order:status"/>
                    </fo:block>
                    
                    <!-- Tableau des articles -->
                    <fo:table border="1pt solid black" margin-bottom="10mm">
                        <fo:table-column column-width="60mm"/>
                        <fo:table-column column-width="30mm"/>
                        <fo:table-column column-width="30mm"/>
                        <fo:table-column column-width="30mm"/>
                        
                        <fo:table-header>
                            <fo:table-row background-color="#4f46e5">
                                <fo:table-cell padding="3mm">
                                    <fo:block font-weight="bold" color="white">Article</fo:block>
                                </fo:table-cell>
                                <fo:table-cell padding="3mm">
                                    <fo:block font-weight="bold" color="white">Prix unitaire</fo:block>
                                </fo:table-cell>
                                <fo:table-cell padding="3mm">
                                    <fo:block font-weight="bold" color="white">Quantite</fo:block>
                                </fo:table-cell>
                                <fo:table-cell padding="3mm">
                                    <fo:block font-weight="bold" color="white">Total</fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                        </fo:table-header>
                        
                        <fo:table-body>
                            <xsl:for-each select="order:items/order:item">
                                <fo:table-row>
                                    <fo:table-cell padding="2mm">
                                        <fo:block><xsl:value-of select="order:mealName"/></fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding="2mm">
                                        <fo:block><xsl:value-of select="order:price"/> EUR</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding="2mm">
                                        <fo:block><xsl:value-of select="order:quantity"/></fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell padding="2mm">
                                        <fo:block><xsl:value-of select="order:price * order:quantity"/> EUR</fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </xsl:for-each>
                        </fo:table-body>
                    </fo:table>
                    
                    <!-- Total -->
                    <fo:block font-size="18pt" font-weight="bold" text-align="right" margin-top="10mm">
                        TOTAL: <xsl:value-of select="order:total"/> EUR
                    </fo:block>
                    
                    <!-- Pied de page -->
                    <fo:block font-size="10pt" text-align="center" margin-top="30mm" color="gray">
                        Merci de votre commande - Cantine Intelligente
                    </fo:block>
                    
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>
    
</xsl:stylesheet>
