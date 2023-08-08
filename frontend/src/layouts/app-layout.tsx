
import React, { Component, PureComponent, useState } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { AuthGuard } from '../validaciones/guard-auth'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Switch,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { functions } from '../functions/addOnLogout';

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    logout: true
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, logout }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={(e) => {
                if (logout) {
                  functions.handleOnLogout()
                }
                closeMenu
              }}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Usuarios",
    icon: UserCircleIcon,
    href: "/usuarios"
  },
  {
    label: "Tareas",
    icon: CubeTransparentIcon,
    href: "/tareas"
  },
  {
    label: "Perfil",
    icon: CodeBracketSquareIcon,
    href: "/perfil"
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon, href }, key) => (
        <NavLink to={href}>
          <Typography
            key={label}
            as="a"
            variant="small"
            color="white"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        </NavLink>
      ))}
    </ul>
  );
}


export const Switch2 = (props: any) => {
  const [_checked, setChecked] = useState(localStorage.theme == "dark" ? true : false)
  return <>
    <div className="inline-flex items-center ml-3">
      <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
        <input
          id="auto-update"
          type="checkbox"
          checked={_checked}
          onChange={({ target }) => {
            const { checked } = target
            if (checked) localStorage.theme = "dark"
            else localStorage.removeItem("theme")
            setChecked(checked)
            location.reload()
          }}
          className="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-blue-gray-100 transition-colors duration-300 checked:bg-blue-gray-500 peer-checked:bg-blue-gray-500 peer-checked:before:bg-blue-gray-500"
        />
        <label
          for="auto-update"
          className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:bg-blue-gray-500 peer-checked:before:bg-blue-gray-500"
        >
          <div
            className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
            data-ripple-dark="true"
          ></div>
        </label>
      </div>
      <label
        for="auto-update"
        className="mt-px ml-3 mb-0 cursor-pointer select-none font-light text-white"
      >
        Dark Mode
      </label>
    </div>
  </>
}


export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="block w-full max-w-full rounded-none m-0 shadow-md backdrop-saturate-200 
    backdrop-blur-2xl bg-opacity-80 border border-purple-300  bg-purple-500 text-white p-2  ">
      <div className="relative mx-auto flex items-center text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <div className='flex'>
            <ListBulletIcon height={'1.5rem'} /> <h1>Notas App Golang-React</h1>
            <Switch2 />
          </div>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ProfileMenu />
      </div>

    </Navbar>
  );
}

const Layout = () => {
  return <div className='max-h-full  bg-gray-300 dark:bg-blue-gray-900  dark:text-white h-full w-full'>
    <ComplexNavbar />
    <div className='px-4 py-2'>
      <Outlet />
    </div>
  </div>

}


export class AppLayout extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { navigate: null }
  }
  componentDidMount(): void {
    const validToken = AuthGuard.validToken()
    if (!validToken) this.setState({ navigate: true })
  }
  render() {
    return <>
      {!this.state.navigate && <Layout />
      }
      {this.state.navigate && (
        <Navigate to="/login" replace={true} />
      )}
    </>

  }
}