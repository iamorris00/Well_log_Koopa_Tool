import './loadlogfile.scss'
import {Button, Card, CardActions, FormControl, Input, InputLabel, Typography} from "@material-ui/core";
import {CloudUpload, ScatterPlot} from "@material-ui/icons";



const LoadLogFile = ({active,file,singleFileChange,uploadFile}) => {

    return (
        <Card className={'card'} style={{backgroundColor:'#f5f3f3'}}>
            <Typography variant={'h6'} style={{backgroundColor:'rgba(34,43,54,0.8)', margin:0,
                                                color:'whitesmoke', padding:5, textAlign:'center'}}>
                Perfiles de pozo de archivos del estandar ASCII (LAS)
            </Typography>
            <div className="container">
                <div className="left">
                    <img src="https://everett-petrophysics.com/wp-content/uploads/2019/03/service-analysis.jpg" alt="well log"/>
                </div>
                <div className="right">
                    <Typography style={{fontSize:16, marginBottom:10}}>
                        El graficador soporta:
                        <br/>
                        1. Registros SP/GR/CAL/Temp
                        <br/>
                        2. Registros resistivos y de induccion
                        <br/>
                        3. Registros porosidad-densidad-PEF
                        <br/>
                        4. Registros GR espectral/Sonicos
                        <br/>
                        5. Registros de formación
                    </Typography>
                    <FormControl disabled>
                        <InputLabel>Archivo</InputLabel>
                        <div className="form-input">
                        <Input id="component-disabled" value={file ? file.name : 'Select the LAS or CSV file'}/>
                            <input
                                style={{display:'none'}}
                                accept=".csv, .las, .txt"
                                id="contained-button-file"
                                type="file"
                                onChange={(e) => singleFileChange(e)}
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    variant="contained"
                                    startIcon={<CloudUpload color={'inherit'} />}
                                    style={{backgroundColor:'#222B36', minWidth:120, color:'whitesmoke'}}
                                    component="span">
                                    Upload
                                </Button>
                            </label>
                            {active && <Button
                                variant="contained"
                                startIcon={<ScatterPlot color={'inherit'} />}
                                style={{backgroundColor:'#7bb5fc', minWidth:120, color:'whitesmoke'}}
                                component="span" onClick={uploadFile}>
                                Plot
                            </Button>}
                        </div>
                    </FormControl>
                </div>
            </div>
            <CardActions style={{justifyContent:"space-between", marginTop:15}}>
                <Button size="small" color="primary" style={{fontSize:12}}>
                    Descargar archivo .LAS de demostración
                </Button>
            </CardActions>
        </Card>
    );
};

export default LoadLogFile;