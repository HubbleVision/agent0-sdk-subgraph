# Phase 7: BSC Testnet Subgraph 部署指南

**创建时间**: 2025-12-02 14:30
**目标**: 将 BSC Testnet Subgraph 部署到 The Graph Network

---

## 📋 前置准备

### 1. The Graph Studio 账号
如果还没有账号，请访问：https://thegraph.com/studio/

**创建步骤**:
1. 访问 https://thegraph.com/studio/
2. 使用钱包连接（MetaMask 等）
3. 首次访问会自动创建账号

### 2. 创建 Subgraph

**在 The Graph Studio 中创建新的 subgraph**:

1. 点击 "Create a Subgraph" 按钮
2. 填写 subgraph 信息：
   - **Name**: `erc-8004-bsc-testnet` (推荐)
   - **Subtitle**: ERC-8004 Agent Discovery on BSC Testnet
   - **Description**: Subgraph for indexing ERC-8004 Trustless Agents on BNB Chain Testnet
   - **Network**: BSC Testnet (Chapel)
   - **Categories**: DeFi, Identity, Social

3. 创建后，记录以下信息：
   - **Subgraph Slug**: 格式通常为 `your-username/erc-8004-bsc-testnet`
   - **Deploy Key**: 部署密钥（仅显示一次，请保存）
   - **Query URL**: GraphQL 查询端点（部署后可用）

### 3. Graph CLI 认证

**命令**:
```bash
graph auth --studio <YOUR_DEPLOY_KEY>
```

**示例**:
```bash
graph auth --studio 1234567890abcdef1234567890abcdef
```

**验证认证**:
```bash
# 如果认证成功，deploy 命令将不再提示错误
```

---

## 🚀 部署步骤

### Step 1: 验证配置

**检查 BSC Testnet 配置**:
```bash
# 验证网络配置
npm run validate

# 应该看到 9 个网络配置，包括 bsc-testnet
```

**检查 manifest 生成**:
```bash
ls -la deployments/generated/erc-8004-bsc-testnet/

# 应该看到 subgraph.yaml 文件
```

### Step 2: 设置环境变量

**创建部署配置**:
```bash
# 设置部署名称
export DEPLOYMENT=erc-8004-bsc-testnet

# 设置 Studio Slug（替换为你的 slug）
export STUDIO_SLUG=your-username/erc-8004-bsc-testnet
```

**示例**:
```bash
export DEPLOYMENT=erc-8004-bsc-testnet
export STUDIO_SLUG=agent0/erc-8004-bsc-testnet
```

### Step 3: 执行部署

**使用部署脚本**:
```bash
npm run deploy:studio
```

**或者手动部署（完整命令）**:
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

### Step 4: 部署输出示例

**成功部署的输出**:
```
🚀 Deploying to The Graph Studio

📋 Deployment Details:
   Deployment: erc-8004-bsc-testnet
   Studio Slug: agent0/erc-8004-bsc-testnet
   Network: BSC Testnet (Chain ID: 97)

📦 Running codegen...
✔ Load subgraph from deployments/generated/erc-8004-bsc-testnet/subgraph.yaml
✔ Generate types for data source templates

🔨 Building subgraph...
✔ Compile subgraph
✔ Write compiled subgraph to build/

🚢 Deploying to Studio...
✔ Upload subgraph to IPFS
Build completed: QmV9EdaYeisjcX8UMz42gEbkywajyPsEvxQjBZVe9cjYE6

Deployed to https://thegraph.com/studio/subgraph/your-username/erc-8004-bsc-testnet

======================================================================
✅ Deployment Successful!
======================================================================

🌐 View your subgraph: https://thegraph.com/studio/subgraph/your-username/erc-8004-bsc-testnet/
```

---

## 🔍 验证部署

### Step 5: 查看 Subgraph 状态

**访问 The Graph Studio**:
```
https://thegraph.com/studio/subgraph/<your-slug>/
```

**检查项目**:
- ✅ 部署状态: "Syncing" 或 "Synced"
- ✅ 当前区块: 应该显示正在索引的区块号
- ✅ 健康状态: Healthy
- ✅ 索引错误: 0 errors

### Step 6: 监控索引进度

**在 Studio 界面查看**:
1. **Indexing Status**
   - Current Block: 当前索引区块
   - Latest Block: BSC Testnet 最新区块
   - Progress: 索引进度百分比

2. **Performance Metrics**
   - Indexing Speed: 区块/秒
   - Time to Sync: 预计同步完成时间

3. **Event Statistics**
   - Total Events: 已索引的事件总数
   - Events by Type: 各类型事件统计

**预期索引速度**:
- BSC Testnet 起始区块: #75935100
- 当前区块（约）: #76000000+
- 需索引区块数: ~65,000
- 预计时间: 10-30 分钟（取决于 Graph Node 负载）

---

## 🧪 测试 GraphQL 端点

### Step 7: 获取查询端点

**开发端点** (免费，有速率限制):
```
https://api.studio.thegraph.com/query/<your-deployment-id>/<subgraph-name>/<version>
```

**示例**:
```
https://api.studio.thegraph.com/query/12345/erc-8004-bsc-testnet/v1.0.0
```

### Step 8: 测试查询

**基础查询 - Meta 信息**:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ _meta { block { number hash } deployment hasIndexingErrors } }"
  }' \
  https://api.studio.thegraph.com/query/<deployment-id>/erc-8004-bsc-testnet/v1.0.0
```

**预期响应**:
```json
{
  "data": {
    "_meta": {
      "block": {
        "number": 75935150,
        "hash": "0x..."
      },
      "deployment": "QmV9EdaYeisjcX8UMz42gEbkywajyPsEvxQjBZVe9cjYE6",
      "hasIndexingErrors": false
    }
  }
}
```

**查询 Agents**:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ agents(first: 5) { id agentId owner createdAt totalFeedback } }"
  }' \
  https://api.studio.thegraph.com/query/<deployment-id>/erc-8004-bsc-testnet/v1.0.0
```

**完整 Agent 信息查询**:
```graphql
{
  agents(first: 10, orderBy: createdAt, orderDirection: desc) {
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
      mcpEndpoint
      a2aEndpoint
    }
    feedback(where: { isRevoked: false }, first: 5) {
      score
      clientAddress
      feedbackFile {
        text
      }
    }
  }
}
```

---

## 📊 发布到 The Graph Network（可选）

### Step 9: 从 Studio 发布到去中心化网络

**前置条件**:
- Subgraph 已在 Studio 中成功同步
- 准备 GRT 代币用于 curation signal
- 理解发布后的费用和策略

**发布步骤**:
1. 在 Studio 界面点击 "Publish" 按钮
2. 设置 Curation Signal（推荐 10,000 GRT）
3. 确认交易并等待发布完成
4. 获取去中心化查询端点

**去中心化端点**:
```
https://gateway.thegraph.com/api/[api-key]/subgraphs/id/[subgraph-id]
```

---

## 🔧 故障排查

### 常见错误 1: 认证失败

**错误信息**:
```
Error: Not authenticated
```

**解决方案**:
```bash
# 重新认证
graph auth --studio <YOUR_DEPLOY_KEY>

# 验证 deploy key 是否正确
# 从 The Graph Studio 重新复制 deploy key
```

### 常见错误 2: Network 不支持

**错误信息**:
```
Error: Network bsc-testnet not supported
```

**解决方案**:
1. 确认 The Graph 支持 BSC Testnet
2. 检查 subgraph.yaml 中的 network 字段
3. 等待 The Graph 添加对该网络的支持

**当前支持情况**:
- The Graph Studio 支持 BSC Testnet (chapel)
- 网络名称: `chapel` 或 `bsc-testnet`

### 常见错误 3: startBlock 过大

**错误信息**:
```
Error: startBlock 75935100 is ahead of latest block
```

**解决方案**:
```bash
# 检查 BSC Testnet 最新区块
# 使用区块浏览器: https://testnet.bscscan.com/

# 如果 startBlock 确实过大，降低到安全值
# 编辑 config/networks/bsc-testnet.json
```

### 常见错误 4: RPC 限流

**错误信息**:
```
Error: rate limit exceeded
```

**解决方案**:
- The Graph 使用自己的 RPC 节点
- 如果持续出现，联系 The Graph 支持
- 检查 subgraph 是否有过多的数据源

### 常见错误 5: IPFS 上传失败

**错误信息**:
```
Error: failed to upload to IPFS
```

**解决方案**:
```bash
# 重试部署
npm run deploy:studio

# 或检查网络连接
ping api.studio.thegraph.com
```

---

## 📈 性能优化建议

### 1. startBlock 优化
✅ 已优化: BSC Testnet startBlock 设置为 **75935100**
- 避免从创世区块同步
- 节省 ~99% 的索引时间

### 2. 事件处理优化
- ✅ 使用高效的 AssemblyScript 代码
- ✅ 避免不必要的计算
- ✅ 使用批量操作

### 3. 查询优化
- 使用分页查询（`first`, `skip`）
- 添加过滤条件减少返回数据
- 使用索引字段进行排序

### 4. 监控和告警
- 设置 Subgraph 健康监控
- 监控索引错误
- 跟踪查询性能

---

## 📋 部署检查清单

### 部署前
- [ ] The Graph Studio 账号已创建
- [ ] Subgraph 已在 Studio 创建
- [ ] Deploy Key 已保存
- [ ] Graph CLI 已认证
- [ ] 网络配置已验证
- [ ] Manifest 已生成

### 部署中
- [ ] Codegen 成功完成
- [ ] Build 成功完成
- [ ] IPFS 上传成功
- [ ] 部署命令成功执行

### 部署后
- [ ] Subgraph 状态为 "Syncing" 或 "Synced"
- [ ] 无索引错误
- [ ] GraphQL 端点可访问
- [ ] Meta 查询返回正确数据
- [ ] 实体查询正常工作

---

## 🎯 成功标准

### 技术指标
- ✅ 部署成功，无错误
- ✅ 索引状态: Healthy
- ✅ 索引错误: 0
- ✅ GraphQL 端点响应正常
- ✅ 查询延迟 < 1 秒

### 功能验证
- ✅ Meta 查询返回当前区块信息
- ✅ Agents 查询语法正确
- ✅ Feedback 查询语法正确
- ✅ Validation 查询语法正确
- ✅ Schema 完整性验证通过

### 性能标准
- ✅ 索引速度 > 50 blocks/second
- ✅ 同步完成时间 < 30 分钟
- ✅ 查询响应时间 < 500ms (p95)

---

## 🚀 后续步骤

### 选项 1: 发布到去中心化网络
如果需要去中心化查询：
1. 在 Studio 点击 "Publish"
2. 设置 Curation Signal
3. 获取去中心化端点

### 选项 2: 部署 BSC Mainnet
当主网合约部署后：
1. 更新 `config/networks/bsc-mainnet.json` 中的合约地址
2. 设置正确的 startBlock
3. 重复上述部署流程，使用 `DEPLOYMENT=erc-8004-bsc-mainnet`

### 选项 3: 更新文档
完成 Phase 8:
1. 更新 README 添加 BSC 支持说明
2. 更新部署文档
3. 准备功能演示

---

## 📞 获取帮助

### The Graph 资源
- **文档**: https://thegraph.com/docs/
- **Discord**: https://discord.gg/graphprotocol
- **论坛**: https://forum.thegraph.com/

### BSC 资源
- **测试网浏览器**: https://testnet.bscscan.com/
- **测试网 RPC**: https://data-seed-prebsc-1-s1.binance.org:8545/
- **水龙头**: https://testnet.binance.org/faucet-smart

---

**部署指南版本**: 1.0.0
**最后更新**: 2025-12-02 14:30
**适用于**: BSC Testnet (Chain ID: 97)
