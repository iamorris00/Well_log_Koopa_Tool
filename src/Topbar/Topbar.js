import './topbar.scss'
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";



const Topbar = ({active}) => {

    return (
        <AppBar  style={{backgroundColor:'#222B36'}}>
            <Toolbar>
                    <Typography className={'title'} variant={'h4'} style={{flexGrow:1}} >
                        Koopa Tool online
                    </Typography>
                    <Button color="inherit" size={'large'}>About</Button>
                    <Button color="inherit" size={'large'}>Help</Button>
                {active && <Button color="inherit" size={'large'}>Subir otro registro</Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;