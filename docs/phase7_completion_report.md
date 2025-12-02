# Phase 7: 部署和验证 - 执行指南与预期结果

**创建时间**: 2025-12-02 14:35
**阶段**: Phase 7 (部署和验证)
**状态**: 准备就绪，等待用户执行

---

## 📋 执行摘要

Phase 7 的准备工作已全部完成。由于部署到 The Graph Network 需要用户的 Graph Studio 账号和认证凭据，本报告提供详细的部署指南、执行脚本和预期结果验证清单。

---

## ✅ 已完成的准备工作

### Step 7.1: 准备 BSC Testnet 部署配置 ✅

**配置验证**:
- ✅ BSC Testnet 网络配置正确
- ✅ 合约地址已配置（3 个合约）
- ✅ startBlock 已优化（75935100）
- ✅ Deployment manifest 已生成
- ✅ 部署状态设置为 "prod"

**配置文件检查**:
```json
// deployments/deployment.json
{
  "erc-8004-bsc-testnet": {
    "network": "bsc-testnet",
    "displayName": "BSC Testnet",
    "chainId": "97",
    "status": "prod",  ✅
    "configFile": "config/networks/bsc-testnet.json"
  }
}
```

**合约地址配置**:
```json
// config/networks/bsc-testnet.json
{
  "identityRegistry": {
    "address": "0xf04A7eEeB7f99631DD08D9C6418ED8f9a8A03292",
    "startBlock": 75935100
  },
  "reputationRegistry": {
    "address": "0x50100029Ac4E6F42505F5773841c03bcfB60181F",
    "startBlock": 75935100
  },
  "validationRegistry": {
    "address": "0x8366684cCE2266aD632bfE78E784007848E05E3a",
    "startBlock": 75935100
  }
}
```

**部署脚本准备**:
- ✅ `scripts/deploy-studio.js` 已验证
- ✅ `package.json` 中的 `deploy:studio` 脚本可用
- ✅ 快捷部署脚本已创建: `/tmp/deploy_bsc_testnet.sh`

**文档准备**:
- ✅ 详细部署指南: `/tmp/phase7_bsc_testnet_deployment_guide.md`
- ✅ 包含故障排查和优化建议
- ✅ 提供完整的验证清单

---

## 🚀 部署执行步骤

### 前置要求

**1. Graph Studio 账号设置**:
```bash
# 访问 The Graph Studio
https://thegraph.com/studio/

# 使用钱包连接并创建账号
```

**2. 创建 Subgraph**:
- 名称: `erc-8004-bsc-testnet` (推荐)
- 网络: BSC Testnet (Chapel)
- 记录 Deploy Key 和 Subgraph Slug

**3. Graph CLI 认证**:
```bash
# 安装 Graph CLI（如果未安装）
npm install -g @graphprotocol/graph-cli

# 使用 Deploy Key 认证
graph auth --studio <YOUR_DEPLOY_KEY>
```

### 执行部署

**方法 1: 使用快捷脚本**:
```bash
# 设置环境变量
export STUDIO_SLUG=your-username/erc-8004-bsc-testnet

# 执行部署脚本
bash /tmp/deploy_bsc_testnet.sh
```

**方法 2: 使用 npm 脚本**:
```bash
# 设置环境变量
export DEPLOYMENT=erc-8004-bsc-testnet
export STUDIO_SLUG=your-username/erc-8004-bsc-testnet

# 执行部署
npm run deploy:studio
```

**方法 3: 手动执行**:
```bash
# 1. Codegen
graph codegen deployments/generated/erc-8004-bsc-testnet/subgraph.yaml

# 2. Build
graph build deployments/generated/erc-8004-bsc-testnet/subgraph.yaml

# 3. Deploy
graph deploy your-username/erc-8004-bsc-testnet \
  deployments/generated/erc-8004-bsc-testnet/subgraph.yaml \
  --node https://api.studio.thegraph.com/deploy/
```

---

## 📊 预期部署结果

### 成功部署的输出

```bash
🚀 Deploying to The Graph Studio

📋 Deployment Details:
   Deployment: erc-8004-bsc-testnet
   Studio Slug: your-username/erc-8004-bsc-testnet
   Network: BSC Testnet (Chain ID: 97)
   Manifest: deployments/generated/erc-8004-bsc-testnet/subgraph.yaml

🔍 Validating manifest...
📦 Running codegen...
✔ Load subgraph from deployments/generated/erc-8004-bsc-testnet/subgraph.yaml
✔ Generate types for data sources

🔨 Building subgraph...
✔ Compile data source: IdentityRegistry
✔ Compile data source: ReputationRegistry
✔ Compile data source: ValidationRegistry
✔ Compile data source template: RegistrationFile
✔ Compile data source template: FeedbackFile
✔ Write compiled subgraph to build/

🚢 Deploying to Studio...
✔ Upload subgraph to IPFS
  Schema: QmeNz8GWYgoKWqa9UfC44e6o1g8sjJk4aXTjUU4U8PQtxG
  Identity ABI: QmezhVQnMuCeBEGPM5orn9bnHgJbpcUr9TfZyNX94HUVSi
  Reputation ABI: QmRqaSqt5ecGW5q4JHFj1MCmiuCc77wgvD4QKLvPe3VZaB
  Validation ABI: Qme7L4xeVYBTxjaCRDdpnGfnUEDzKFW6JSVcuNFtXv35AM
  Identity WASM: QmWzFb5oENiKgocKyh96CW3Go8TSycw6s21jcoh92nmWWC
  Reputation WASM: QmcoJz77Paq5iSN3tacBToBgMTF8gskTvNNTwB5DEisGSQ
  Validation WASM: QmWfGW8bqrQ2zn1Fc1ZX8gWaZTUHG7j9aWwU8bszL2dCLA
  RegistrationFile WASM: QmR2QSTvqeSHd4ombqVFpzGy8kMKpiUuUkh6vYHFJS2e1a
  FeedbackFile WASM: QmRKTEU7XxYP8YvJF6XQauSB8bxKVGtBq7CTihqsVM8X6P

Build completed: QmV9EdaYeisjcX8UMz42gEbkywajyPsEvxQjBZVe9cjYE6

Deployed to https://thegraph.com/studio/subgraph/your-username/erc-8004-bsc-testnet

======================================================================
✅ Deployment Successful!
======================================================================

🌐 View your subgraph: https://thegraph.com/studio/subgraph/your-username/erc-8004-bsc-testnet/
```

### 部署后的状态

**The Graph Studio 界面显示**:
```
Status: Syncing ⏳
Current Block: 75935150
Latest Block: 76543210
Progress: 0.9%
Health: Healthy ✅
Indexing Errors: 0
```

**预期索引速度**:
- 区块索引速度: 50-200 blocks/second
- 需索引区块数: ~608,000 块（从 75935100 到当前）
- 预计同步时间: 15-45 分钟

---

## 🔍 部署验证清单

### Step 7.4: 验证 BSC Testnet Subgraph 运行状态

**验证 1: Studio 界面检查**
- [ ] 访问 `https://thegraph.com/studio/subgraph/<your-slug>/`
- [ ] 状态显示 "Syncing" 或 "Synced"
- [ ] Health 状态为 "Healthy"
- [ ] Indexing Errors 为 0
- [ ] Current Block 正在增长

**验证 2: GraphQL Playground 测试**
```graphql
# 在 Studio Playground 中执行

# 查询 Meta 信息
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
      "block": {
        "number": 75935200,
        "hash": "0x..."
      },
      "deployment": "QmV9EdaYeisjcX8UMz42gEbkywajyPsEvxQjBZVe9cjYE6",
      "hasIndexingErrors": false
    }
  }
}
```

**验证 3: Schema 完整性**
```graphql
# 查询类型定义
{
  __schema {
    types {
      name
    }
  }
}
```

**应包含的类型**:
- Agent, AgentMetadata, AgentRegistrationFile, AgentStats
- Feedback, FeedbackFile, FeedbackResponse
- Validation, ValidationStatus
- GlobalStats, Protocol

**验证 4: 数据查询**
```graphql
# 查询 Agents（如果有数据）
{
  agents(first: 5, orderBy: createdAt, orderDirection: desc) {
    id
    chainId
    agentId
    owner
    totalFeedback
    createdAt
  }
}
```

**验证 5: 性能测试**
```bash
# 使用 curl 测试查询延迟
time curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ _meta { block { number } } }"}' \
  https://api.studio.thegraph.com/query/<deployment-id>/erc-8004-bsc-testnet/v1.0.0

# 预期响应时间: < 500ms
```

---

## 📈 性能监控

### 关键指标

**索引性能**:
| 指标 | 目标值 | 当前值（示例） |
|------|--------|----------------|
| 索引速度 | > 50 blocks/sec | 120 blocks/sec |
| 同步进度 | 100% | 85% |
| 延迟 | < 10 blocks | 5 blocks |
| 错误率 | 0% | 0% |

**查询性能**:
| 指标 | 目标值 | 当前值（示例） |
|------|--------|----------------|
| P50 延迟 | < 200ms | 150ms |
| P95 延迟 | < 500ms | 320ms |
| P99 延迟 | < 1s | 680ms |
| 可用性 | > 99.9% | 99.98% |

**数据统计**（完全同步后）:
- 总 Agents: 依赖实际链上数据
- 总 Feedbacks: 依赖实际链上数据
- 总 Validations: 依赖实际链上数据
- 总事件数: 依赖实际链上数据

---

## 🧪 GraphQL 查询示例

### 基础查询

**查询最新的 Agents**:
```graphql
{
  agents(
    first: 10
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    chainId
    agentId
    owner
    agentURI
    createdAt
    totalFeedback
    registrationFile {
      name
      description
      image
      mcpEndpoint
      a2aEndpoint
    }
  }
}
```

**查询 Feedback**:
```graphql
{
  feedbacks(
    first: 20
    where: { isRevoked: false }
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    agent {
      id
      registrationFile {
        name
      }
    }
    score
    clientAddress
    feedbackFile {
      text
      capability
    }
    createdAt
  }
}
```

**查询 Validations**:
```graphql
{
  validations(
    first: 10
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    agent {
      id
    }
    validatorAddress
    response
    status
    tag
    createdAt
  }
}
```

### 高级查询

**聚合统计**:
```graphql
{
  globalStats(id: "global") {
    totalAgents
    totalFeedback
    totalValidations
    totalProtocols
    tags
    updatedAt
  }

  protocols(first: 5) {
    id
    chainId
    name
    totalAgents
    totalFeedback
    totalValidations
  }
}
```

**复杂过滤**:
```graphql
{
  agents(
    first: 10
    where: {
      totalFeedback_gte: 5
      owner: "0x..."
    }
    orderBy: totalFeedback
    orderDirection: desc
  ) {
    id
    agentId
    owner
    totalFeedback

    feedback(
      first: 5
      where: {
        isRevoked: false
        score_gte: 80
      }
    ) {
      score
      tag1
      feedbackFile {
        text
      }
    }
  }
}
```

---

## 🎯 验收标准

### 技术指标
- ✅ 部署成功无错误
- ✅ 索引状态: Healthy
- ✅ 索引错误: 0
- ✅ 同步完成时间 < 45 分钟
- ✅ GraphQL 端点响应正常
- ✅ 查询延迟 < 500ms (P95)

### 功能验证
- ✅ Meta 查询返回正确的区块信息
- ✅ Schema 包含所有实体类型
- ✅ Agent 查询正常工作
- ✅ Feedback 查询正常工作
- ✅ Validation 查询正常工作
- ✅ 过滤和排序功能正常

### 数据完整性
- ✅ startBlock 设置正确 (75935100)
- ✅ 合约地址配置正确
- ✅ 所有数据源正确索引
- ✅ IPFS 文件正常获取

---

## 🔧 故障排查参考

### 问题 1: 部署失败 - 认证错误

**症状**:
```
Error: Not authenticated
```

**解决方案**:
```bash
# 重新认证
graph auth --studio <YOUR_DEPLOY_KEY>

# 验证认证状态
graph auth --status
```

### 问题 2: 索引失败 - RPC 错误

**症状**:
```
Error: Failed to fetch block from RPC
```

**解决方案**:
- The Graph 使用自己的 RPC，通常不会出现此问题
- 如果持续失败，联系 The Graph 支持
- 检查网络配置是否正确

### 问题 3: 索引停滞

**症状**:
- Current Block 不再增长
- Status 显示 "Syncing" 但无进展

**解决方案**:
1. 检查 Indexing Errors 是否有错误
2. 查看详细日志
3. 重新部署最新版本
4. 联系 The Graph 支持

### 问题 4: 查询返回空数据

**症状**:
```json
{
  "data": {
    "agents": []
  }
}
```

**原因分析**:
- ✅ **正常情况**: BSC Testnet 合约地址上可能确实没有数据
- ⚠️ **配置错误**: 检查合约地址是否正确
- ⚠️ **索引未完成**: 等待索引完成

**验证步骤**:
```bash
# 1. 检查链上是否有事件
# 访问 BSC Testnet 区块浏览器
https://testnet.bscscan.com/address/0xf04A7eEeB7f99631DD08D9C6418ED8f9a8A03292#events

# 2. 检查索引进度
# 查询 _meta 确认当前区块
```

---

## 📋 完成清单

### Phase 7.1: 准备部署 ✅
- [x] 验证 BSC Testnet 配置
- [x] 检查合约地址
- [x] 确认 startBlock 优化
- [x] 生成 deployment manifest
- [x] 创建部署脚本
- [x] 编写部署指南

### Phase 7.2: 部署到 The Graph Network ⏳
- [ ] 创建 Graph Studio 账号
- [ ] 创建 Subgraph
- [ ] 获取 Deploy Key
- [ ] Graph CLI 认证
- [ ] 执行部署命令
- [ ] 确认部署成功

### Phase 7.3: BSC Mainnet 部署 ⏸️
- [ ] 等待 BSC Mainnet 合约部署
- [ ] 更新合约地址
- [ ] 设置正确的 startBlock
- [ ] 重复部署流程

### Phase 7.4: 验证运行状态 ⏳
- [ ] 检查 Studio 界面状态
- [ ] 验证索引进度
- [ ] 确认无索引错误
- [ ] 测试 GraphQL Playground

### Phase 7.5: 生产验证 ⏳
- [ ] 测试 API 端点
- [ ] 验证查询性能
- [ ] 检查数据完整性
- [ ] 监控错误日志

---

## 🎉 总结

### 准备工作完成情况
| 类别 | 状态 | 说明 |
|------|------|------|
| 配置文件 | ✅ 完成 | BSC Testnet 配置已验证 |
| 部署脚本 | ✅ 完成 | deploy-studio.js 和快捷脚本 |
| 文档 | ✅ 完成 | 详细部署指南和故障排查 |
| 验证清单 | ✅ 完成 | 完整的验收标准 |

### 待用户执行的步骤
1. **创建 Graph Studio 账号**（5 分钟）
2. **创建 Subgraph**（5 分钟）
3. **认证 Graph CLI**（2 分钟）
4. **执行部署命令**（10-15 分钟）
5. **验证部署结果**（15-30 分钟等待同步）

### 预计总时间
- **设置时间**: 10-15 分钟
- **部署时间**: 10-15 分钟
- **同步时间**: 15-45 分钟
- **验证时间**: 10-15 分钟
- **总计**: 约 1-1.5 小时

---

## 📞 支持资源

### 文档位置
- 部署指南: `/tmp/phase7_bsc_testnet_deployment_guide.md`
- 快捷脚本: `/tmp/deploy_bsc_testnet.sh`
- 完成报告: `/tmp/phase7_completion_report.md`

### 外部资源
- The Graph 文档: https://thegraph.com/docs/
- The Graph Studio: https://thegraph.com/studio/
- BSC Testnet 浏览器: https://testnet.bscscan.com/
- Graph Protocol Discord: https://discord.gg/graphprotocol

---

**报告版本**: 1.0.0
**创建时间**: 2025-12-02 14:35
**状态**: 准备就绪，等待用户执行部署
**下一步**: 用户完成部署后，继续 Phase 8 (文档和验收)
