<template>
    <div class="detail-wrapper">
      <div class="query-container">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign" inline style="text-align: left;margin-left: 10px">
          <el-form-item label="搜索">
            <el-autocomplete
              class="inline-input"
              v-model="search"
              :fetch-suggestions="querySearch"
              @select="userSelected"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="选择日期" >
            <el-date-picker
              v-model="formLabelAlign.date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateSelected"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-table
          border
          :data="receiptList.filter(data=>formLabelAlign.date?(data.date>=formLabelAlign.date[0]&&data.date<=formLabelAlign.date[1]):true)"
          ref="multipleTable"
          :cell-style="{wordWrap: 'break-word'}"
          :highlight-current-row="false"
          @selection-change="handleSelectionChange"
          style="width: 1050px;margin: 10px">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="出货日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="goodArr"
            label="货物信息">
            <el-table-column
              label="货物名称" width="120">
              <template slot-scope="scope">
                <p v-for="(good,index) in scope.row.goodArr" :key="index">
                  {{good.fullname}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="张">
              <template slot-scope="scope">
                <p v-for="(good,index) in scope.row.goodArr" :key="index">
                  {{good.count}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="米">
              <template slot-scope="scope">
                <p v-for="(good,index) in scope.row.goodArr" :key="index">
                  {{good.meter?good.meter: '0'}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="单价">
              <template slot-scope="scope">
                <p v-for="(good,index) in scope.row.goodArr" :key="index">
                  {{good.price}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :fit="true"
              label="备注">
              <template slot-scope="scope">
                <p v-for="(good,index) in scope.row.goodArr" :key="index" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                  {{good.comments?good.comments:'无'}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="总价">
            </el-table-column>
          </el-table-column>

          <el-table-column
            prop="comments"
            label="备注"
            width="278">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "GoodDetail",
    data() {
      return {
        formLabelAlign: {},
        search: '',
        receiptList: [],
        userArr: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    async mounted() {
      this.userArr = (await axios.get(`${process.env.API_BASE}/api/goods/sell/user`)).data.userArr
    },
    methods: {
      querySearch(queryString,cb) {
        let userArr = this.userArr;
        let results = queryString ? userArr.filter(user=>user.value.indexOf(queryString)>-1) : userArr;
        cb(results);
      },
      async userSelected(value) {
        this.receiptList = (await axios.post(`${process.env.API_BASE}/api/goods/sell/goodlist`,{manifestArr:value.manifestArr})).data.receiptList
      },
      dateSelected(date) {
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>

</style>
