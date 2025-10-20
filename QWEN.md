# 实验室仪器管理系统

## 项目概述

这是一个基于 Next.js 15.2.4 开发的现代化实验室仪器管理平台，主要用于管理实验室设备的预约、使用、培训和资质申请等流程。该系统采用移动端优先的设计理念，提供完整的仪器预约、送样检测、扫码上下机等功能。

### 核心功能

1. **用户管理**：支持普通用户和管理员角色
2. **仪器管理**：设备信息展示、状态管理（可用/使用中/维护中/离线）
3. **预约系统**：机时预约功能，支持预约状态管理
4. **资质申请**：用户需申请使用资质，支持培训和考试要求
5. **送样服务**：送样预约功能，管理样品信息和检测流程
6. **扫码上机**：通过扫描二维码完成设备使用启动
7. **消息通知**：多种通知类型（预约提醒、审核结果等）
8. **数据统计**：使用记录跟踪、扣费管理、培训记录

### 技术栈

- **前端框架**：Next.js 15.2.4, React 19
- **UI 框架**：Shadcn UI 组件库、Radix UI
- **样式**：Tailwind CSS + 自定义动画
- **状态管理**：Zustand
- **图标库**：Lucide React
- **日期处理**：date-fns
- **类型安全**：TypeScript

## 项目结构

```
shengwu-app/
├── app/                    # Next.js 应用页面路由
│   ├── admin/             # 管理员功能页面
│   ├── instruments/       # 仪器相关页面
│   ├── login/             # 登录页面
│   ├── messages/          # 消息页面
│   ├── profile/           # 个人资料页面
│   ├── qualifications/    # 资质管理页面
│   ├── reservations/      # 预约页面
│   ├── samples/           # 送样页面
│   ├── scan/              # 扫码页面
│   ├── settings/          # 设置页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # UI 组件和功能组件
│   ├── admin/             # 管理员相关组件
│   ├── home/              # 首页组件
│   ├── instruments/       # 仪器相关组件
│   ├── messages/          # 消息组件
│   ├── profile/           # 个人资料组件
│   ├── reservations/      # 预约组件
│   ├── samples/           # 送样组件
│   ├── scan/              # 扫码组件
│   ├── settings/          # 设置组件
│   ├── ui/                # 通用 UI 组件
│   ├── mobile-layout.tsx  # 移动布局组件
│   └── theme-provider.tsx # 主题提供组件
├── hooks/                 # React 自定义 Hooks
├── lib/                   # 业务逻辑和工具函数
│   ├── store.ts           # Zustand 状态管理
│   ├── types.ts           # TypeScript 类型定义
│   └── mock-data.ts       # 模拟数据
├── public/                # 静态资源文件
├── styles/                # 样式文件
├── package.json           # 项目依赖配置
├── next.config.mjs        # Next.js 配置
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.ts     # Tailwind CSS 配置
└── README.md              # 项目说明文件
```

## 构建和运行

### 环境要求

- Node.js (建议版本 18+)
- pnpm (作为包管理器)

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

这将在开发模式下启动应用，通常在 http://localhost:3000 访问。

### 构建应用

```bash
pnpm build
```

### 启动生产版本

```bash
pnpm start
```

### 导出静态版本

```bash
pnpm export
```

## 开发约定

### 组件结构

- 所有组件按功能领域组织在 `components/` 目录下
- UI 原子组件放置在 `components/ui/` 目录下
- 使用 TypeScript 进行类型安全开发

### 状态管理

- 使用 Zustand 进行全局状态管理
- 状态存储在 `lib/store.ts` 中
- 类型定义统一在 `lib/types.ts` 中定义

### 数据模拟

- 项目目前使用 `lib/mock-data.ts` 中的模拟数据
- 后续应替换为实际后端 API

### 移动端适配

- 使用 `MobileLayout` 组件处理移动端布局
- 固定底部导航栏设计
- 使用响应式设计原则

### 代码规范

- 使用 Prettier 进行代码格式化
- 使用 TypeScript 进行类型检查
- 遵循 Next.js 的文件路由约定