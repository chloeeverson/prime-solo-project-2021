import { Typography, Grid } from '@material-ui/core';
import {useSelector} from 'react-redux'
import prompts from '../redux/reducers/prompts.reducer';


function List(){

    const title = useSelector(store => store.prompts);

    return (
        <Grid>
        <Typography variant="h3" align="center" color="primary">{title.location}</Typography>
        <Typography variant="subtitle1" align="center" color="primary">{title.start_date}</Typography>
        </Grid>
        
    );

}

export default List;