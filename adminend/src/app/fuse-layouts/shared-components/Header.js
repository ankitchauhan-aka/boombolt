import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
// import { toggleVariateDescSize } from './store/notesSlice';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Header(props) {
	const dispatch = useDispatch();

	return (
		<div className="flex flex-1 items-center justify-between p-8 sm:p-24 relative">
			<div className="flex flex-shrink items-center sm:w-224">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32 ml-12 pl-3 header-icon">{props.icon}</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="ml-12 sm:flex header-Text">
							{props.headText}
						</Typography>
					</FuseAnimate>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-end">
				{
                    props.backLink ? 
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Tooltip title="Back to List" placement="bottom">
                                <IconButton
                                    className="mx-8 whitespace-nowrap"
                                    component={Link}
                                    variant="outlined"
                                    to={props.backLink}
                                    color="inherit"
                                >
                                    <Icon>arrow_back</Icon>
                                </IconButton>
                            </Tooltip>
                        </FuseAnimate>
                        :
                        <> 
                            <Search handle={props.handleSearch} />
                            {props.addLink && <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Tooltip title="Add New" placement="bottom">
                                    <IconButton
                                        className="mx-8 whitespace-nowrap"
                                        component={Link}
                                        variant="outlined"
                                        to={props.addLink}
                                        color="inherit"
                                    >
                                        <Icon>add</Icon>
                                    </IconButton>
                                </Tooltip>
                            </FuseAnimate>}
                        </>
                }
                
			</div>
		</div>
	);
}

export default Header;
