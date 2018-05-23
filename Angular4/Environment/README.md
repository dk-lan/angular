# 搭建环境 - 基于 Angular CLI 新建项目
Angular CLI 是一个命令行接口(Command Line Interface)，用于实现自动化开发工作流程。它允许你做以下这些事情：
- 创建一个新的 Angular 应用程序
- 运行带有 LiveReload 支持的开发服务器，以便在开发过程中预览应用程序
- 添加功能到现有的 Angular 应用程序
- 运行应用程序的单元测试
- 运行应用程序的端到端 (E2E) 测试
- 构建应用程序
在使用 Angular CLI 之前，你必须确保系统中 Node.js 的版本高于 6.9.0 且 npm 的版本高于 3.0.0。

## 安装 Angular CLI
- 安装 Angular CLI `npm install -g @angular/cli`
- 检测 Angular CLI 是否安装成功 `ng --version`  

## 使用 Angular CLI
1. `ng new [project-name]` 创建新的项目
2. `cd project-name`
3. `ng serve` 启动本地服务器，默认端口为 4200
4. `ng serve --host 0.0.0.0 --port 4201` 可配置端口
5. 使用`--open`（或`-o`）参数可以自动打开浏览器并访问http://localhost:4200/


## 常用的 Angular CLI 命令
用命令创建的时候可以添加路径，比如：
`ng g c ./components/hero` 则会在 `./src/app` 目录下自动创建（如果已存在则不会创建）目录 components，再在这个目录下创建对应的组件 hero。
<table>
    <thead>
        <tr>
            <th>应用程序</th><th>命令</th><th>快捷键</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>新建 (Class)</td>
            <td>ng generate class my-new-class</td>
            <td>ng g cl my-new-class</td>
        </tr>
        <tr>
            <td>新建组件 (Component)</td>
            <td>ng generate component my-new-component</td>
            <td>ng g c my-new-component</td>
        </tr>        
        <tr>
            <td>新建指令 (Directive)</td>
            <td>ng generate directive my-new-directive</td>
            <td>ng g d my-new-directive</td>
        </tr>
        <tr>
            <td>新建枚举 (Enum)</td>
            <td>ng generate enum my-new-enum</td>
            <td>ng g e my-new-enum</td>
        </tr> 
        <tr>
            <td>新建模块 (Module)</td>
            <td>ng generate module my-new-module</td>
            <td>ng g m my-new-module</td>
        </tr>  
        <tr>
            <td>新建管道 (Pipe)</td>
            <td>ng generate pipe my-new-pipe</td>
            <td>ng g p my-new-pipe</td>
        </tr>  
        <tr>
            <td>新建服务 (Service)</td>
            <td>ng generate service my-new-service</td>
            <td>ng g s my-new-service</td>
        </tr>                                     
    </tbody>
</table>
