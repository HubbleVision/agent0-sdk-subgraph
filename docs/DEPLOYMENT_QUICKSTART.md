# 🚀 BSC Testnet Subgraph 部署快速指南

## ✅ 已完成的准备工作

所有配置、脚本和文档已准备就绪，可以立即部署！

### 配置验证
- ✅ BSC Testnet 网络配置已验证
- ✅ 3 个合约地址已配置
- ✅ startBlock 优化到 75935100（节省 99% 同步时间）
- ✅ Deployment manifest 已生成
- ✅ 本地测试成功（Phase 6 完成）

### 文档和脚本
- 📄 **详细部署指南**: `/tmp/phase7_bsc_testnet_deployment_guide.md`
- 📜 **自动化部署脚本**: `/tmp/deploy_bsc_testnet.sh`
- 📋 **完成报告**: `/tmp/phase7_completion_report.md`
- 📚 **Phase 6 本地测试报告**: `/tmp/phase6_completion_report.md`

---

## 🎯 3 步快速部署

### 步骤 1: 设置 The Graph Studio (5-10 分钟)

1. **访问 The Graph Studio**
   ```
   https://thegraph.com/studio/
   ```

2. **连接钱包并创建 Subgraph**
   - 点击 "Create a Subgraph"
   - Name: `erc-8004-bsc-testnet`
   - Network: **BSC Testnet (Chapel)**
   - 点击 "Create Subgraph"

3. **保存重要信息**
   - 📝 **Deploy Key**: (显示一次，请立即保存！)
   - 📝 **Subgraph Slug**: `your-username/erc-8004-bsc-testnet`

### 步骤 2: 认证 Graph CLI (2 分钟)

```bash
# 使用你的 Deploy Key 认证
graph auth --studio <YOUR_DEPLOY_KEY>

# 应该看到: "Deploy key set for https://api.studio.thegraph.com/deploy/"
```

### 步骤 3: 部署 (5-10 分钟)

```bash
# 设置你的 Subgraph Slug
export STUDIO_SLUG=your-username/erc-8004-bsc-testnet

# 执行部署脚本
bash /tmp/deploy_bsc_testnet.sh
```

**就这么简单！** 🎉

---

## 📊 预期结果

### 部署成功输出

```
🚀 Deploying to The Graph Studio

📋 Deployment Details:
   Deployment: erc-8004-bsc-testnet
   Studio Slug: your-username/erc-8004-bsc-testnet
   Network: BSC Testnet (Chain ID: 97)

✔ Compile subgraph
✔ Upload subgraph to IPFS
  Build completed: QmV9EdaYeisjcX8UMz42gEbkywajyPsEvxQjBZVe9cjYE6

======================================================================
✅ Deployment Successful!
======================================================================

🌐 View your subgraph: https://thegraph.com/studio/subgraph/your-username/erc-8004-bsc-testnet/
```

### 索引状态

部署成功后，在 Studio 界面你将看到：

```
Status: Syncing ⏳
Current Block: 75935150
Latest Block: ~76543210
Progress: 0.9%
Health: Healthy ✅
Indexing Errors: 0
```

**预计同步时间**: 15-45 分钟

---

## 🧪 部署后验证

### 1. 访问 Studio 界面

```
https://thegraph.com/studio/subgraph/<your-slug>/
```

检查：
- ✅ Status: "Syncing" 或 "Synced"
- ✅ Health: "Healthy"
- ✅ Errors: 0

### 2. 测试 GraphQL 查询

在 Studio Playground 中执行：

```graphql
{
  _meta {
    block {
      number
      hash
    }
    deployment
    hasIndexingErrors
  }
}
```

**预期响应**:
```json
{
  "data": {
    "_meta": {
      "block": { "number": 75935200 },
      "deployment": "QmV9EdaYeisjcX8UMz42gEbkywajyPsEvxQjBZVe9cjYE6",
      "hasIndexingErrors": false
    }
  }
}
```

### 3. 查询实体数据

```graphql
{
  agents(first: 5) {
    id
    agentId
    owner
    createdAt
  }
}
```

---

## ❓ 常见问题

### Q: "Not authenticated" 错误？
**A**: 重新运行认证命令
```bash
graph auth --studio <YOUR_DEPLOY_KEY>
```

### Q: Deploy Key 在哪里找？
**A**: 在 The Graph Studio subgraph 详情页的 "Settings" 标签中

### Q: 如何查看部署日志？
**A**: 在 Studio 界面的 "Logs" 标签中

### Q: 索引很慢？
**A**: 正常情况，startBlock 优化后预计 15-45 分钟完成同步

### Q: 数据为空？
**A**: 这是正常的，BSC Testnet 合约地址上可能确实没有注册的 Agent

---

## 📁 完整文档

需要详细信息？查看这些文档：

1. **📖 完整部署指南**
   ```
   /tmp/phase7_bsc_testnet_deployment_guide.md
   ```
   - 详细步骤说明
   - 故障排查指南
   - GraphQL 查询示例
   - 性能优化建议

2. **📊 预期结果报告**
   ```
   /tmp/phase7_completion_report.md
   ```
   - 部署验收标准
   - 性能指标
   - 完整验证清单

3. **📄 Phase 6 本地测试报告**
   ```
   /tmp/phase6_completion_report.md
   ```
   - 本地测试结果
   - 配置验证
   - Schema 完整性验证

---

## 🎉 完成后的成就

当你完成部署后，你将拥有：

- ✅ 生产环境的 BSC Testnet Subgraph
- ✅ 公开的 GraphQL API 端点
- ✅ The Graph 去中心化网络的索引服务
- ✅ 完整的 ERC-8004 Agent 数据索引
- ✅ 实时的链上数据查询能力

---

## 📞 需要帮助？

- 📖 The Graph 文档: https://thegraph.com/docs/
- 💬 Discord: https://discord.gg/graphprotocol
- 🌐 BSC Testnet 浏览器: https://testnet.bscscan.com/

---

**祝你部署顺利！** 🚀✨

有任何问题随时查看完整文档或寻求社区帮助。
