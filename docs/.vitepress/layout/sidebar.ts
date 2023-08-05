import { DefaultTheme } from 'vitepress'
import {
  eassySidebarDetail,
  toolSidebarDetail,
  linuxSidebarDetail,
  nginxSidebarDetail,
} from './sidebarList'

export const sidebar: DefaultTheme.Sidebar = {
  ...eassySidebarDetail,
  ...toolSidebarDetail,
  ...linuxSidebarDetail,
  ...nginxSidebarDetail,
}