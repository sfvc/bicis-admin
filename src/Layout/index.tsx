import React, { useEffect } from 'react';
import Sidebar from './VerticalLayout/Sidebar';
import Header from './Header';
import Footer from './Footer';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import {
  changeLayout,
  changeLayoutSemiDark,
  changeSkin,
  changeLayoutMode,
  changeDirection,
  changeLayoutContentWidth,
  changeNavigation,
  changeLeftSidebarColorType,
  changeLayoutTopbarColor
} from "../slices/thunk";

const Layout = ({ children }: any) => {
  document.title = "Vamos en Bici";

  const dispatch = useDispatch<any>();

  const selectLayoutState = (state: any) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutType: layout.layoutType,
      layoutSemiDarkType: layout.layoutSemiDarkType,
      layoutSkintype: layout.layoutSkintype,
      layoutModeType: layout.layoutModeType,
      layoutDirectionType: layout.layoutDirectionType,
      layoutContentWidthType: layout.layoutContentWidthType,
      layoutSidebarSizeType: layout.layoutSidebarSizeType,
      layoutNavigationType: layout.layoutNavigationType,
      layoutSidebarColorType: layout.layoutSidebarColorType,
      layoutTopbarColorType: layout.layoutTopbarColorType,
    })
  );
  // Inside your component
  const {
    layoutType,
    layoutSemiDarkType,
    layoutSkintype,
    layoutModeType,
    layoutDirectionType,
    layoutContentWidthType,
    layoutSidebarSizeType,
    layoutNavigationType,
    layoutSidebarColorType,
    layoutTopbarColorType
  } = useSelector(selectLayoutProperties);

  /*
    layout settings
  */
  useEffect(() => {
    if (
      layoutType ||
      layoutSemiDarkType ||
      layoutSkintype ||
      layoutModeType ||
      layoutDirectionType ||
      layoutContentWidthType ||
      layoutNavigationType ||
      layoutSidebarColorType ||
      layoutTopbarColorType
    ) {
      window.dispatchEvent(new Event('resize'));
      dispatch(changeLayout(layoutType));
      dispatch(changeLayoutSemiDark(layoutSemiDarkType));
      dispatch(changeSkin(layoutSkintype));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeDirection(layoutDirectionType));
      dispatch(changeLayoutContentWidth(layoutContentWidthType));
      dispatch(changeNavigation(layoutNavigationType));
      dispatch(changeLeftSidebarColorType(layoutSidebarColorType));
      dispatch(changeLayoutTopbarColor(layoutTopbarColorType));
    }
  }, [layoutType,
    layoutSemiDarkType,
    layoutSkintype,
    layoutModeType,
    layoutDirectionType,
    layoutContentWidthType,
    layoutNavigationType,
    layoutSidebarColorType,
    layoutTopbarColorType,
    dispatch]);

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth", "group");
    document.body.classList.add('text-base', 'bg-body-bg', 'text-body', 'font-public', 'dark:text-zink-100', 'dark:bg-zink-800', 'group-data-[skin=bordered]:bg-body-bordered', 'group-data-[skin=bordered]:dark:bg-zink-700');
    return () => {
      document.documentElement.classList.remove("scroll-smooth", "group");
      document.body.classList.remove('text-base', 'bg-body-bg', 'text-body', 'font-public', 'dark:text-zink-100', 'dark:bg-zink-800', 'group-data-[skin=bordered]:bg-body-bordered', 'group-data-[skin=bordered]:dark:bg-zink-700');
    };
  }, []);

  return (
    <>
      <div className="group-data-[sidebar-size=sm]:min-h-sm group-data-[sidebar-size=sm]:relative">
        <ToastContainer closeButton={true} limit={1} />
        <Sidebar layoutType={layoutType} layoutSidebarSizeType={layoutSidebarSizeType} />
        <Header />
        <div className='relative min-h-screen group-data-[sidebar-size=sm]:min-h-sm'>
          <div className="group-data-[sidebar-size=lg]:ltr:md:ml-vertical-menu group-data-[sidebar-size=lg]:rtl:md:mr-vertical-menu group-data-[sidebar-size=md]:ltr:ml-vertical-menu-md group-data-[sidebar-size=md]:rtl:mr-vertical-menu-md group-data-[sidebar-size=sm]:ltr:ml-vertical-menu-sm group-data-[sidebar-size=sm]:rtl:mr-vertical-menu-sm pt-[calc(theme('spacing.header')_*_1)] pb-[calc(theme('spacing.header')_*_0.8)] px-4 group-data-[navbar=bordered]:pt-[calc(theme('spacing.header')_*_1.3)] group-data-[navbar=hidden]:pt-0 group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl group-data-[layout=horizontal]:px-0 group-data-[layout=horizontal]:group-data-[sidebar-size=lg]:ltr:md:ml-auto group-data-[layout=horizontal]:group-data-[sidebar-size=lg]:rtl:md:mr-auto group-data-[layout=horizontal]:md:pt-[calc(theme('spacing.header')_*_1.8)] group-data-[layout=horizontal]:px-3 group-data-[layout=horizontal]:group-data-[navbar=hidden]:pt-[calc(theme('spacing.header')_*_0.9)]">
            <div className='container-fluid group-data-[content=boxed]:max-w-boxed mx-auto'>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
