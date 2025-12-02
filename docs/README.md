# BSC Support Documentation

本目录包含 BSC (BNB Chain) 支持开发的所有文档。

## 📁 文档索引

### 规划和任务文档
- **[20251202_1014_bsc_support.plan.md](./20251202_1014_bsc_support.plan.md)** - BSC 支持技术方案
- **[20251202_1014_bsc_support.todo.md](./20251202_1014_bsc_support.todo.md)** - 任务清单和进度跟踪

### Phase 完成报告
- **[phase5_completion_report.md](./phase5_completion_report.md)** - Phase 5: 验证和构建完成报告
- **[phase6_completion_report.md](./phase6_completion_report.md)** - Phase 6: 本地测试完成报告
- **[phase7_completion_report.md](./phase7_completion_report.md)** - Phase 7: 部署和验证准备报告

### 部署指南
- **[DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)** - 🚀 快速入门指南（推荐从这里开始）
- **[phase7_deployment_guide.md](./phase7_deployment_guide.md)** - 详细部署指南

## 🚀 快速开始

### 1. 本地测试（已完成）
本地 Graph Node 测试已在 Phase 6 完成，详见 [phase6_completion_report.md](./phase6_completion_report.md)

### 2. 部署到 The Graph Network

**快速部署** (3 步)：

```bash
# 1. 认证 Graph CLI（需要先在 The Graph Studio 创建 Subgraph）
graph auth --studio <YOUR_DEPLOY_KEY>

# 2. 设置环境变量
export STUDIO_SLUG=your-username/erc-8004-bsc-testnet

# 3. 执行部署
npm run deploy:bsc-testnet
```

详细步骤请参考 [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)

## 📊 开发进度

### 已完成 Phases
- ✅ **Phase 1**: 创建网络配置文件
- ✅ **Phase 2**: 注册到部署配置
- ✅ **Phase 3**: 更新链 ID 映射
- ✅ **Phase 4**: 更新合约地址映射
- ✅ **Phase 4.5**: P2 问题修复（startBlock 优化、地址格式修复、函数命名冲突解决）
- ✅ **Phase 5**: 验证和构建
- ✅ **Phase 6**: 本地测试

### 当前 Phase
- ⏳ **Phase 7**: 部署和验证（准备就绪，等待用户执行）
  - 配置和文档已完成
  - 需要用户在 The Graph Studio 执行部署

### 待完成 Phases
- ⏸️ **Phase 8**: 文档和验收

## 🔧 关键技术决策

### startBlock 优化
- **BSC Testnet**: 75935100（从合约部署区块开始，节省 99% 索引时间）
- **BSC Mainnet**: 0（待更新，当前使用零地址占位符）

### 合约地址配置
- **Identity Registry**: `0xf04A7eEeB7f99631DD08D9C6418ED8f9a8A03292`
- **Reputation Registry**: `0x50100029Ac4E6F42505F5773841c03bcfB60181F`
- **Validation Registry**: `0x8366684cCE2266aD632bfE78E784007848E05E3a`

### 网络配置
- **Chain ID**: 97 (BSC Testnet), 56 (BSC Mainnet)
- **RPC**: 由 The Graph 提供
- **网络标识符**: `bsc-testnet`, `bsc-mainnet`

## 📚 相关链接

### 外部资源
- **The Graph Studio**: https://thegraph.com/studio/
- **The Graph 文档**: https://thegraph.com/docs/
- **BSC Testnet 浏览器**: https://testnet.bscscan.com/
- **BSC 文档**: https://docs.bnbchain.org/

### 项目资源
- **Scripts**: `../scripts/`
  - `deploy-bsc-testnet.sh` - BSC Testnet 部署脚本
  - `deploy-studio.js` - Studio 部署脚本
  - `validate.js` - 配置验证脚本
  - `generate.js` - Manifest 生成脚本

## 🎯 下一步行动

1. **立即可执行**: 部署 BSC Testnet 到 The Graph Network
   - 参考: [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)
   - 预计时间: 30-60 分钟（含同步时间）

2. **等待合约部署**: BSC Mainnet 部署
   - 需要更新合约地址
   - 需要设置正确的 startBlock

3. **完成文档**: Phase 8 文档和验收
   - 更新 README
   - 更新部署文档
   - 准备功能演示

## 📝 版本历史

- **2025-12-02**: 初始版本，完成 Phase 1-6
- **2025-12-02**: Phase 7 准备完成，创建部署文档和脚本

---

**维护者**: AI Assistant
**最后更新**: 2025-12-02
