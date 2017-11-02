
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">书籍名称：</span>
      <span class="expand-value">{{ row.bookName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">作者名：</span>
      <span class="expand-value">{{ row.authorName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">出版社：</span>
      <span class="expand-value">{{ row.publishHouse }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">出版日期：</span>
      <span class="expand-value">《{{ row.date }}》</span>
      </Col>
      <Col span="8">
      <span class="expand-key">书籍定价：</span>
      <span class="expand-value">{{ row.priceNum }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">分类：</span>
      <span class="expand-value">{{ row.category }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">书籍数量：</span>
      <span class="expand-value">{{ row.bookCount }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">书籍描述：</span>
      <span class="expand-value">{{ row.desc }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
  };
</script>
<style scoped>
  .expand-row{
    margin-bottom: 10px;
  }
</style>
