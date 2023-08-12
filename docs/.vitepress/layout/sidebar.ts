import { DefaultTheme } from 'vitepress'
import {
  eassySidebarDetail,
  toolSidebarDetail,
  linuxSidebarDetail,
  nginxSidebarDetail,
  nodeSidebarDetail,
  algorithmSidebarDetail,
} from './sidebarList'

export const sidebar: DefaultTheme.Sidebar = {
  ...eassySidebarDetail,
  ...toolSidebarDetail,
  ...linuxSidebarDetail,
  ...nginxSidebarDetail,
  ...nodeSidebarDetail,
  ...algorithmSidebarDetail,
}