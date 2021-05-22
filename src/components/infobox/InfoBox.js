import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import './infobox.css';

function InfoBox(props) {
    const {title, cases, total, active, isRed, onClick} = props;
    // console.log({props});
    return (
        <Card onClick={onClick} className={`infobox ${active && 'infobox_active'} ${isRed && 'infobox_red'}`}>  
            <CardContent>
                <Typography color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infobox_cases">{cases}</h2>

                <Typography className="infobox_total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
            
        </Card>
    )
}

export default InfoBox
