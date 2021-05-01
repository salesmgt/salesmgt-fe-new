import React from 'react';
import {Menu,MenuItem, Paper} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {database} from '../../../../services/firebase'
import classes from './Notify.module.scss'

function Notify(props) {    
  const {todoList,limit,next,onUpdate}  = props
    const isNotifMenuOpen = Boolean(props.notifAnchorEl)
    // const ITEM_HEIGHT = 100
    const handleNotifMenuClose = React.useCallback(() => {
        props.setNotifAnchorEl(null)
    }, [])
    return (
            <Menu
            anchorEl={props.notifAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'center', horizontal: 'right' }}
            keepMounted
            open={isNotifMenuOpen}
            onClose={handleNotifMenuClose}
            PaperProps={{
                style: {
                    maxHeight: '50ch',
                    maxWidth: '45ch'
                },
            }}
        >
            {todoList?.length < 1 && 
              <MenuItem >
              <span>No notifications.....</span>
                     </MenuItem>  }
            {todoList?.map((item, index) => 
               <MenuItem
                    key={index}
                    onClick={e =>onUpdate(e,item)}
                    className={classes.notiItem}
                    >
                    <Card className={classes.notiCard}>
                      <CardHeader
                        avatar={ <Avatar src={item.avatar}/>}
                        title={`${item.actor} (${item.type})`}
                        subheader={item.timestamp}
                      />
                      <CardContent className={classes.notiContent}>
                        <Typography className={classes.typo} variant="body2" color="textSecondary" component="p">
                          {item.content}
                        </Typography>
                      </CardContent>
                    </Card>
                        {/* <span className={classes.content}>{item.content}</span> */}
                       
                </MenuItem>  
            )    
                
              }  
             {
                (limit &&todoList?.length >5) &&
                   <MenuItem onClick={next}    >
                        <span>See More.....</span>
                     </MenuItem> 
             }
              
            
           
        </Menu> 
        
    );
}

export default Notify;