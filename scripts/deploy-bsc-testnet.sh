#!/bin/bash

# BSC Testnet Subgraph 部署脚本
# 使用前请先完成 Graph Studio 设置和认证

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  BSC Testnet Subgraph 部署脚本${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# 检查环境变量
if [ -z "$STUDIO_SLUG" ]; then
    echo -e "${RED}❌ 错误: STUDIO_SLUG 环境变量未设置${NC}"
    echo ""
    echo -e "${YELLOW}请先设置你的 Studio Slug:${NC}"
    echo -e "${CYAN}  export STUDIO_SLUG=your-username/erc-8004-bsc-testnet${NC}"
    echo ""
    exit 1
fi

# 设置部署配置
export DEPLOYMENT=erc-8004-bsc-testnet

echo -e "${GREEN}📋 部署配置:${NC}"
echo -e "  Deployment: ${DEPLOYMENT}"
echo -e "  Studio Slug: ${STUDIO_SLUG}"
echo ""

# 步骤 1: 验证配置
echo -e "${YELLOW}🔍 步骤 1/5: 验证网络配置...${NC}"
npm run validate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 配置验证失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 配置验证通过${NC}"
echo ""

# 步骤 2: 生成 manifest
echo -e "${YELLOW}📦 步骤 2/5: 生成 deployment manifest...${NC}"
npm run generate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Manifest 生成失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Manifest 生成成功${NC}"
echo ""

# 步骤 3: 检查认证
echo -e "${YELLOW}🔐 步骤 3/5: 检查 Graph CLI 认证...${NC}"
echo -e "${CYAN}提示: 如果未认证，请运行:${NC}"
echo -e "${CYAN}  graph auth --studio <YOUR_DEPLOY_KEY>${NC}"
echo ""

# 步骤 4: 确认部署
echo -e "${YELLOW}⚠️  即将部署到 The Graph Studio${NC}"
echo ""
read -p "确认继续部署? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}部署已取消${NC}"
    exit 0
fi

# 步骤 5: 执行部署
echo -e "${YELLOW}🚀 步骤 5/5: 部署到 The Graph Studio...${NC}"
npm run deploy:studio

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✅ 部署成功!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${CYAN}🌐 查看你的 Subgraph:${NC}"
    echo -e "${CYAN}  https://thegraph.com/studio/subgraph/${STUDIO_SLUG}/${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  ❌ 部署失败${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo -e "${YELLOW}请检查错误信息并参考故障排查指南${NC}"
    exit 1
fi
