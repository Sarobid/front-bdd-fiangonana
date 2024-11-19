import { Card, Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DekoninaFicheAffectation from "composants/DekoninaFicheAffectation";
import ListeFicheDrag from "composants/ListeFicheDrag";
import ListeMpiangonaDrag from "composants/ListeMpiangonaDrag";
import StatistiqueFiche from "composants/StatistiqueFiche";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import { Button } from "react-bootstrap";

function ListeFiche() {
    const [filter, setfilter] = useState({});
    const [showFiche, setShowFiche] = useState(false);
    const [dekoninaSelected, setDekoninaSelected] = useState(null);
    const [ficheCheckeds, setFicheCheCkeds] = useState([]);
    const toggleFiche = () => {
        setShowFiche(prevState => !prevState);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <ArgonBox mb={3}>
                    <Card>
                        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <ArgonTypography variant="h2">Repartition Fiche</ArgonTypography>
                        </ArgonBox>
                        <ArgonBox
                            sx={{
                                "& .MuiTableRow-root:not(:last-child)": {
                                    "& td": {
                                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                            `${borderWidth[1]} solid ${borderColor}`,
                                    },
                                },
                            }}
                        >
                            <Grid container spacing={3} mb={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Card>
                                        {/* <StatistiqueDekonina onClickChart={(f) => setfilter(f)} /> */}
                                        <StatistiqueFiche onClickChart={(f) => setfilter(f)} />
                                    </Card>
                                </Grid>

                                {/* Bouton pour afficher/masquer les fiches */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" onClick={toggleFiche}>
                                            {showFiche ? "Annuler l'affectation" : "Affecter a un dekonina"}
                                        </Button>
                                    </div>
                                </Grid>

                                {/* Affichage conditionnel de ListeMpiangonaDrag avec largeur ajustable */}
                                <Grid item xs={12} md={showFiche ? 4 : 12} lg={showFiche ? 4 : 12}>
                                    <Card>
                                    <ListeFicheDrag
                                                    title="Liste des Fiche de Recenssements"
                                                    filterValue0={{ ...filter }}
                                                    ficheCheckeds={ficheCheckeds}
                                                    setFicheChecked={setFicheCheCkeds}
                                                    afficheChecked={true}
                                                />
                                          
                                    </Card>
                                </Grid>

                                {/* Affichage conditionnel de ListeFicheDrag */}
                                {showFiche && (
                                    <>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Card>
                                                <DekoninaFicheAffectation 
                                                dekonina={dekoninaSelected}
                                                setDekonina={setDekoninaSelected}
                                                 fiches={ficheCheckeds}
                                                setFiches = {setFicheCheCkeds}
                                                actionApresValidation={()=>{window.location.reload() }}
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Card>
                                            <ListeMpiangonaDrag
                                            title="Liste des Dekonina"
                                            filterValue0={{ estdekonina: "ENY" }}
                                            setSelectedDekonina={setDekoninaSelected}
                                            selectedDekonina={dekoninaSelected}
                                        />
                                            </Card>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </ArgonBox>
                    </Card>
                </ArgonBox>
            </ArgonBox>
            <Footer />
        </DashboardLayout>
    );
}

export default ListeFiche;