import Head from 'next/head'
import NavBarIndustry from '../../components/navbar'
import styles from '../../styles/pages/industry/connect.page.module.css'
import {
    DialogActions, DialogTitle, DialogContent, Backdrop,
    CircularProgress, createStyles, DialogContentText, makeStyles, Theme,
    Button,
    Dialog,
    Slide
} from '@material-ui/core';
import { useState } from 'react';
import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CamComponents from '../../components/cam';
import SettingsComponents from '../../components/settings';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function IndustryConnect() {
    const [loading, setLoading] = useState(true)
    const classes = useStyles();

    setTimeout(() => {
        setLoading(false)
    }, 1000)

    return (
        <div>
            <Head>
                <title>IConnect: Home</title>
            </Head>
            <div className={styles.connectPage}>
                {(!loading) ?
                    <>
                        <NavBarIndustry />
                        <SettingsComponents />

                    </> : <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>}
            </div>
        </div>
    )
}
