import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
// import { modalOpen } from 'redux/modals/modalsActions';
// import { USER_REGISTRATION_MODAL } from 'constants/modals';
import './admin-top-menu.scss'

class LeftMenu extends Component {
    isPageAllowed = code => {
        // const { auth } = this.props;
        // const { allowedAdminPages = [], userTypeId = 0 } = auth;
        // return userTypeId === 4 || allowedAdminPages.indexOf(code) > -1;
        return true
    };

    state = {
        activeNavItem: '',
        menuModel: {
            0: {
                navItemName: 'Home',
                tag: 'NavLink',
                iconClassName: 'fas fa-home',
                isPathExact: true,
                pathTo: `/`,
                isPageAllowed: this.isPageAllowed('UsersActivity'),
                // customOnClick: () => someFunction(), // You can pass function you need to make some additional onClick event handling
            },
            1: {
                navItemName: 'Users',
                tag: 'NavLink',
                iconClassName: 'fas fa-users',
                pathTo: `/users`,
                isActive: false,
                isPageAllowed: this.isPageAllowed('UsersActivity'),
                // customOnClick: () => someFunction(), // You can pass function you need to make some additional onClick event handling
            },
            2: {
                navItemName: 'Ingredients',
                tag: 'NavLink',
                iconClassName: 'fas fa-carrot',
                pathTo: `/ingredients`,
                isActive: false,
                customOnClick: () => {
                    if (this.isPageAllowed('UserRequests')) {
                        this.props.history.push(`/admin/usersrequests`);
                        this.setActiveNavItem('Users Requests');
                    }
                },
                isPageAllowed: this.isPageAllowed('UsersActivity'),
                // children: {
                //     0: {
                //         navItemName: 'All Users',
                //         tag: 'NavLink',
                //         pathTo: `/admin/allusers`,
                //         isPageAllowed: this.isPageAllowed('AllUsers'),
                //     },
                //     1: {
                //         navItemName: 'Users Requests',
                //         tag: 'NavLink',
                //         pathTo: `/admin/usersrequests`,
                //         isPageAllowed: this.isPageAllowed('UserRequests'),
                //     },
                //     2: {
                //         navItemName: 'Register New User',
                //         tag: 'div',
                //         // onClick: () => this.openUserRegistration(),
                //         isPageAllowed: this.isPageAllowed('RegisterUsers'),
                //     },
                //     3: {
                //         navItemName: 'Confirmation Link',
                //         tag: 'NavLink',
                //         pathTo: `/admin/confirmationlink`,
                //         isPageAllowed: this.isPageAllowed('ConfimationLink'),
                //     },
                //     4: {
                //         navItemName: 'Contacts',
                //         tag: 'NavLink',
                //         pathTo: `/admin/contacts`,
                //         isPageAllowed: this.isPageAllowed('Contacts'),
                //     },
                // },
            },
            3: {
                navItemName: 'Recipes',
                iconClassName: 'fas fa-clipboard-list',
                tag: 'NavLink',
                pathTo: `/recipes`,
                isActive: false,
                customOnClick: () => {
                    if (this.isPageAllowed('DeclareInterestReport')) {
                        this.props.history.push(`/admin/declareinterest`);
                        this.setActiveNavItem('Declare Interest Report');
                    }
                },
                isPageAllowed: this.isPageAllowed('UsersActivity'),
                // children: {
                //     0: {
                //         navItemName: 'Sold Players',
                //         tag: 'NavLink',
                //         pathTo: `/admin/sold-players`,
                //         isPathExact: true,
                //         isPageAllowed: this.isPageAllowed('SoldPlayers'),
                //     },
                //     1: {
                //         navItemName: 'Friendly Matches Report',
                //         tag: 'NavLink',
                //         pathTo: `/admin/friendly-matches`,
                //         isPathExact: true,
                //         isPageAllowed: this.isPageAllowed('FriendlyMatches'),
                //     },
                //     2: {
                //         navItemName: 'All Pitches Report',
                //         tag: 'NavLink',
                //         pathTo: `/admin/allpitches`,
                //         isPathExact: true,
                //         isPageAllowed: this.isPageAllowed('AllPitchesReport'),
                //     },
                //     3: {
                //         navItemName: 'Declare Interest Report',
                //         tag: 'NavLink',
                //         pathTo: `/admin/declareinterest`,
                //         isPathExact: true,
                //         isPageAllowed: this.isPageAllowed(
                //             'DeclareInterestReport',
                //         ),
                //     },
                //     4: {
                //         navItemName:
                //             'Tracking Clicks on Expired Ads Notification',
                //         tag: 'NavLink',
                //         pathTo: `/admin/notifications/expired-ads`,
                //         isPathExact: true,
                //         isPageAllowed: this.isPageAllowed(
                //             'ExpiredAdsNotifications',
                //         ),
                //     },
                // },
            },
            4: {
                navItemName: 'Activity',
                tag: 'NavLink',
                iconClassName: 'fas fa-chart-pie',
                pathTo: `/activity`,
                isActive: false,
                isPageAllowed: this.isPageAllowed('UsersActivity'),
                // customOnClick: () => someFunction(), // You can pass function you need to make some additional onClick event handling
            },
            // 5: {
            //     navItemName: 'Dishes',
            //     iconClassName: 'fas fa-cookie-bite',
            //     isActive: false,
            //     children: {
            //         0: {
            //             navItemName: 'Admins',
            //             tag: 'NavLink',
            //             pathTo: `/admin/adminpermissions`,
            //             isPageAllowed: this.isPageAllowed('AdminsPermissions'),
            //         },
            //         // 1: {
            //         //     navItemName: 'Club Old',
            //         //     tag: 'NavLink',
            //         //     pathTo: `${this.props.match.url}/clubpermissions`,
            //         //     isPageAllowed: this.isPageAllowed('ClubPermissions')
            //         // },
            //         2: {
            //             navItemName: 'Clubs',
            //             tag: 'NavLink',
            //             pathTo: `/admin/clubpermissions-new`,
            //             isPageAllowed: this.isPageAllowed('ClubPermissions'),
            //             isActive: false,
            //         },
            //         3: {
            //             navItemName: 'Users',
            //             tag: 'NavLink',
            //             pathTo: `/admin/userpermissions`,
            //             isPageAllowed: this.isPageAllowed('UserPermissions'),
            //             isActive: false,
            //         },
            //     },
            // },
            // 6: {
            //     navItemName: 'Success Stories',
            //     iconClassName: 'trico-rocket',
            //     isActive: false,
            //     children: {
            //         0: {
            //             navItemName: 'Transfers',
            //             tag: 'NavLink',
            //             pathTo: `/admin/success-story`,
            //             isPathExact: true,
            //             isPageAllowed: this.isPageAllowed('SuccessStories'),
            //         },
            //         1: {
            //             navItemName: 'Friendlies',
            //             tag: 'NavLink',
            //             pathTo: `/admin/friendly-success-story`,
            //             isPathExact: true,
            //             isPageAllowed:
            //                 this.isPageAllowed('SuccessStories') &&
            //                 this.isPageAllowed('FriendlySuccessStories'),
            //         },
            //     },
            // },
            // 7: {
            //     navItemName: 'Clubs Info',
            //     iconClassName: 'trico-folder-home',
            //     isActive: false,
            //     children: {
            //         0: {
            //             navItemName: 'Clubs/Squads',
            //             tag: 'NavLink',
            //             pathTo: `/admin/squads`,
            //             isPageAllowed: this.isPageAllowed('AdminClubs'),
            //         },
            //         1: {
            //             navItemName: 'Players',
            //             tag: 'NavLink',
            //             pathTo: `/admin/players`,
            //             isPageAllowed: this.isPageAllowed('AdminPlayers'),
            //         },
            //         2: {
            //             navItemName: 'Messaging',
            //             tag: 'NavLink',
            //             pathTo: `/admin/messaging`,
            //             isPageAllowed: this.isPageAllowed('Messaging'),
            //         },
            //     },
            // },
            // 8: {
            //     navItemName: 'Clubs Management',
            //     iconClassName: 'trico-folder-share',
            //     isActive: false,
            //     children: {
            //         0: {
            //             navItemName: 'Mapping',
            //             tag: 'NavLink',
            //             pathTo: `/admin/multisource-management`,
            //             isPathExact: true,
            //             isPageAllowed: this.isPageAllowed(
            //                 'MultisourceManagement',
            //             ),
            //         },
            //         1: {
            //             navItemName: 'New Squads Download',
            //             tag: 'NavLink',
            //             pathTo: `/admin/new-squads-download`,
            //             isPathExact: true,
            //             isPageAllowed: this.isPageAllowed('NewSquadsDownload'),
            //         },
            //     },
            // },
            // 9: {
            //     navItemName: 'Email Proposals',
            //     iconClassName: 'trico-letter',
            //     isActive: false,
            //     children: {
            //         0: {
            //             navItemName: 'Club Ads',
            //             tag: 'NavLink',
            //             pathTo: `/admin/clubads`,
            //             isPathExact: true,
            //             isPageAllowed: this.isPageAllowed('ClubAds'),
            //         },
            //         1: {
            //             navItemName: 'Friendly Proposals',
            //             tag: 'NavLink',
            //             pathTo: `/admin/friendly-proposals`,
            //             isPathExact: true,
            //             isPageAllowed: this.isPageAllowed('FriendlyProposals'),
            //         },
            //         2: {
            //             navItemName: 'Player Proposals',
            //             tag: 'NavLink',
            //             pathTo: `/admin/player-proposals`,
            //             isPathExact: true,
            //             isPageAllowed: this.isPageAllowed('PlayerProposals'),
            //         },
            //     },
            // },
            // 10: {
            //     navItemName: 'Events',
            //     iconClassName: 'trico-events',
            //     isActive: false,
            //     children: {
            //         0: {
            //             navItemName: 'Events',
            //             tag: 'NavLink',
            //             pathTo: `/admin/events`,
            //             isPageAllowed: this.isPageAllowed('Event'),
            //         },
            //         1: {
            //             navItemName: 'Event Attendance',
            //             tag: 'NavLink',
            //             pathTo: `/admin/event-attendance`,
            //             isPageAllowed: this.isPageAllowed('EventAttendance'),
            //         }
            //     },
            // },

        },
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeNavItem !== this.state.activeNavItem) {
            this.switchActiveNavItem();
        }
    }

    // openUserRegistration() {
    //     this.props.onOpen({ id: USER_REGISTRATION_MODAL, content: {} });
    // }

    setActiveNavItem(navItemName) {
        this.setState({
            activeNavItem: navItemName,
        });
    }

    switchActiveNavItem() {
        let newMenuModel = () => {
            let result = {};
            for (var item in this.state.menuModel) {
                if (this.state.menuModel[item].children) {
                    if (
                        (this.state.menuModel[item].navItemName ===
                            this.state.activeNavItem ||
                            Object.values(
                                this.state.menuModel[item].children,
                            ).some(
                                item =>
                                    item.navItemName ===
                                    this.state.activeNavItem,
                            )) &&
                        (this.state.menuModel[item].isActive !== null ||
                            this.state.menuModel[item].isActive !== undefined)
                    ) {
                        result[item] = {
                            ...this.state.menuModel[item],
                            isActive: true,
                        };
                    } else if (
                        this.state.menuModel[item].isActive !== null ||
                        this.state.menuModel[item].isActive !== undefined
                    ) {
                        result[item] = {
                            ...this.state.menuModel[item],
                            isActive: false,
                        };
                    }
                }
            }
            return result;
        };
        let result = newMenuModel();
        this.setState({
            menuModel: {
                ...this.state.menuModel,
                ...result,
            },
        });
    }

    render() {
        const renderNavItemWithoutChildren = (item, index) => {
            if (item.isPageAllowed) {
                switch (item.tag) {
                    case 'NavLink': {
                        return (
                            <div key={index} className="item-container">
                                <div className="nav-item without-submenu">
                                    <NavLink
                                        exact={
                                            item.isPathExact ? true : undefined
                                        }
                                        to={item.pathTo}
                                        onClick={() =>
                                            this.setActiveNavItem(
                                                item.navItemName,
                                            )
                                        }
                                    >
                                        {/* <span className={item.iconClassName} /> */}
                                        <span className={item.iconClassName}></span>
                                        <p style={{ marginBottom: 0 }}>
                                            {item.navItemName}
                                        </p>
                                        <div
                                            className="onClick-wrapper"
                                            onClick={
                                                item.customOnClick
                                                    ? () => item.customOnClick()
                                                    : undefined
                                            }
                                        />
                                    </NavLink>
                                </div>
                            </div>
                        );
                    }
                    case 'div': {
                        return (
                            <div key={index} className="item-container">
                                <div className="nav-item without-submenu">
                                    <div
                                        exact={
                                            item.isPathExact ? true : undefined
                                        }
                                        to={item.pathTo}
                                        onClick={() => item.onClick()}
                                    >
                                        <span className={item.iconClassName}></span>
                                        <p style={{ marginBottom: 0 }}>
                                            {item.navItemName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    default: {
                        return (
                            <div key={index} className="item-container">
                                <div className="nav-item without-submenu">
                                    <NavLink
                                        exact={
                                            item.isPathExact ? true : undefined
                                        }
                                        to={item.pathTo}
                                        onClick={() =>
                                            this.setActiveNavItem(
                                                item.navItemName,
                                            )
                                        }
                                    >
                                        <span className={item.iconClassName} />
                                        <p style={{ marginBottom: 0 }}>
                                            {item.navItemName}
                                        </p>
                                        <div
                                            className="onClick-wrapper"
                                            onClick={
                                                item.customOnClick
                                                    ? () => item.customOnClick()
                                                    : undefined
                                            }
                                        />
                                    </NavLink>
                                </div>
                            </div>
                        );
                    }
                }
            } else {
                return null;
            }
        };

        const renderNavItemWithChildren = (item, index) => {
            const isAnyOfChildrenIsAllowed = () => {
                const result = [];
                for (var prop in item.children) {
                    if (item.children[prop].isPageAllowed) {
                        result.push(true);
                    }
                }
                if (result.some(i => i === true)) return true;
            };
            if (
                isAnyOfChildrenIsAllowed() &&
                Object.keys(item.children).length > 0
            ) {
                return (
                    <div key={index} className="item-container">
                        <div
                            className={`nav-item ${
                                item.isActive ? 'active' : ''
                                }`}
                        >
                            <span className={item.iconClassName} />
                            <p style={{ marginBottom: 0 }}>
                                {item.navItemName}
                            </p>
                            <div
                                className="onClick-wrapper"
                                onClick={
                                    item.customOnClick
                                        ? () => item.customOnClick()
                                        : undefined
                                }
                            />
                            <div className={`sub-menu-container`}>
                                <ul>
                                    {Object.keys(item.children).map(
                                        (key, index) => {
                                            if (
                                                item.children[key]
                                                    .isPageAllowed === true
                                            ) {
                                                switch (
                                                item.children[key].tag
                                                ) {
                                                    case 'NavLink': {
                                                        return (
                                                            <li key={index}>
                                                                <NavLink
                                                                    exact={
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ]
                                                                            .isPathExact
                                                                            ? true
                                                                            : undefined
                                                                    }
                                                                    to={
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ].pathTo
                                                                    }
                                                                    onClick={() => {
                                                                        this.setActiveNavItem(
                                                                            item
                                                                                .children[
                                                                                key
                                                                            ]
                                                                                .navItemName,
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ]
                                                                            .navItemName
                                                                    }
                                                                </NavLink>
                                                            </li>
                                                        );
                                                    }
                                                    case 'div': {
                                                        return (
                                                            <li key={index}>
                                                                <div
                                                                    exact={
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ]
                                                                            .isPathExact
                                                                            ? true
                                                                            : undefined
                                                                    }
                                                                    onClick={() =>
                                                                        item.children[
                                                                            key
                                                                        ].onClick()
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ]
                                                                            .navItemName
                                                                    }
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                    default: {
                                                        return (
                                                            <li key={index}>
                                                                <NavLink
                                                                    exact={
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ]
                                                                            .isPathExact
                                                                            ? true
                                                                            : undefined
                                                                    }
                                                                    to={
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ].pathTo
                                                                    }
                                                                    onClick={() =>
                                                                        this.setActiveNavItem(
                                                                            item
                                                                                .children[
                                                                                key
                                                                            ]
                                                                                .navItemName,
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .children[
                                                                            key
                                                                        ]
                                                                            .navItemName
                                                                    }
                                                                </NavLink>
                                                            </li>
                                                        );
                                                    }
                                                }
                                            } else {
                                                return null;
                                            }
                                        },
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        };
        return (
            <>
                <nav className="admin-top-menu">
                    <div className="menu-controls">
                        <div className="menu-controls__togglers">
                            <span
                                className="fas fa-plus-square"
                                onClick={() => this.openAllMenuItems()}
                            />
                            <span
                                className="fas fa-times-circle"
                                onClick={() => this.closeAllMenuItems()}
                            />
                        </div>
                    </div>
                    <div className="admin-top-menu__menu">
                        {Object.keys(this.state.menuModel).map((key, index) => {
                            if (!this.state.menuModel[key].children) {
                                return renderNavItemWithoutChildren(
                                    this.state.menuModel[key],
                                    index,
                                );
                            } else {
                                return renderNavItemWithChildren(
                                    this.state.menuModel[key],
                                    index,
                                );
                            }
                        })}
                    </div>
                </nav>
            </>
        );
    }
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = {
    // onOpen: modalOpen,
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(LeftMenu),
);
