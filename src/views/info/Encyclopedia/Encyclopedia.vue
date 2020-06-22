<template>
  <e-card>
    <e-row class="topBlock">
      <e-col :span="12">
        <e-button class="add" size="small" @click="handleShowAddModal">
          <i class="el-icon-document-add" /> 新增
        </e-button>
      </e-col>
    </e-row>
    <e-row class="bottomBlock">
      <e-col :span="24">
        <e-table
          :height="tableHeight"
          :fit="false"
          :data="tableData"
          row-key="id"
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <span v-for="item in columns">
            <!--
            <e-table-column
              v-if="item.prop == 'id'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              align="center"
              :fixed="'left'"
              :show-overflow-tooltip="true"
            />
            -->
            <e-table-column
              v-if="item.prop != 'starDetail'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              align="center"
              :show-overflow-tooltip="true"
            />
            <e-table-column
              v-else
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              align="center"
              :show-overflow-tooltip="true"
            />
          </span>
          <e-table-column fixed="right" align="center" label="操作" width="150">
            <template slot-scope="scope">
              <e-button
                class="edit"
                type="primary"
                size="small"
                @click="handleShowEditModal(scope.row)"
                >编辑</e-button
              >
              <e-popconfirm
                title="此数据删除后无法恢复，确认删除吗？"
                @onConfirm="handleShowDelModal(scope.row)"
              >
                <e-button slot="reference" type="danger" size="small"
                  >删除</e-button
                >
              </e-popconfirm>
            </template>
          </e-table-column>
        </e-table>
        <e-pagination
          style="margin-top: 20px; float: right;"
          :current-page="pageination.current"
          :page-size="pageination.pageSize"
          :page-sizes="pageSizeOptions"
          :total="pageination.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </e-col>
    </e-row>
    <e-dialog
      top="23vh"
      :title="modalTitle"
      :visible.sync="showModal"
      :width="width"
      :modal="true"
      :destroy-on-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <e-form ref="$form" :model="form" :rules="rules" label-width="120px">
        <e-row>
          <e-col :span="12">
            <e-form-item label="星座名称" prop="name" label-width="80px">
              <e-select v-model="form.name"/>
            </e-form-item>
          </e-col>
          <e-col :span="12">
            <e-form-item label="创建用户" prop="userName">
              <e-input v-model="form.userName" :disabled="true" />
            </e-form-item>
          </e-col>
        </e-row>
        <e-row>
          <e-col :span="24">
            <e-tabs v-model="activeName" type="card">
              <e-tab-pane label="事业特质" name="work">
                <e-form-item label="事业特质文案" prop="work">
                  <e-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    v-model="detail.work"
                  />
                </e-form-item>
              </e-tab-pane>
              <e-tab-pane label="爱情特质" name="love">
                <e-form-item label="爱情特质文案" prop="love">
                  <e-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    v-model="detail.love"
                  />
                </e-form-item>
              </e-tab-pane>
              <e-tab-pane label="财运特质" name="money">
                <e-form-item label="财运特质文案" prop="love">
                  <e-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    v-model="detail.money"
                  />
                </e-form-item>
              </e-tab-pane>
              <e-tab-pane label="性格特质" name="health">
                <e-form-item label="性格特质文案" prop="health">
                  <e-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    v-model="detail.life"
                  />
                </e-form-item>
              </e-tab-pane>
            </e-tabs>
          </e-col>
        </e-row>
      </e-form>
      <div slot="footer" class="dialog-footer">
        <e-button type="primary" @click="handleOK">保存</e-button>
        <e-button @click="handleCancel">取消</e-button>
      </div>
    </e-dialog>
  </e-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Button,
  Card,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Pagination,
  Popconfirm,
  Row,
  Table,
  TableColumn,
  TabPane,
  Tabs,
} from "element-ui";
import moment from "moment";
import { formObj, tableObj } from "@/views/info/interface/interface";
import Server from "@/utils/serverless";

let server: any = new Server();

@Component({
  components: {
    "e-card": Card,
    "e-table": Table,
    "e-table-column": TableColumn,
    "e-row": Row,
    "e-col": Col,
    "e-button": Button,
    "e-pagination": Pagination,
    "e-dialog": Dialog,
    "e-form": Form,
    "e-form-item": FormItem,
    "e-input": Input,
    'e-select': Select,
    "e-tabs": Tabs,
    "e-tab-pane": TabPane,
    "e-popconfirm": Popconfirm,
  },
})
export default class Encyclopedia extends Vue {
  /**
     * 列表相关属性
     * /
     *
     /** 分页数量 */
  private pageSizeOptions: Array<any> = [10, 20, 30, 40];
  /** 分页对象 */
  private pageination: any = {
    current: 0,
    pageSize: 10,
    total: 0,
  };
  /** 表格数据 */
  private tableData: Array<tableObj> = [];
  /** 表格列数据 */
  private columns: Array<any> = [
    { prop: "id", label: "ID", width: 200 },
    { prop: "name", label: "星座名称", minWidth: 200 },
    { prop: "starDetail", label: "星座特点", minWidth: 200 },
    { prop: "createAt", label: "创建时间", width: 200 },
    { prop: "updateAt", label: "最后更新时间", width: 200 },
    { prop: "userName", label: "创建用户", width: 100 },
  ];

  /**
   * 弹框相关属性
   */
  /** 主表新增/编辑弹框开关 */
  private showModal: boolean = false;
  /** 弹框标题 */
  private modalTitle: string = "";
  /** 弹框宽度 */
  private width: string = "50%";

  /**
   * 表单相关属性
   */
  /** 表单对象 */
  private form: formObj = {
    id: "",
    name: "",
    content: [],
    userName: "汤圆",
  };
  private detail: Object = {
    work: "",
    love: "",
    money: "",
    life: "",
  };
  /** 表单验证对象 */
  private rules: object = {
    name: [{ required: true, message: "请输入星座名称", trigger: "blur" }],
  };
  /** 表单默认打开tab */
  private activeName: string = "work";
  /** 表格高度 计算属性*/
  private tableHeight = "700px";

  mounted() {
    this.getUserName();
    this.getEncyclopedia();
  }

  /**
   * 获取用户名
   */
  private getUserName() {
    console.log("getUserName", server.user.current());
  }

  /**
   * 查询星座运势列表
   */
  private async getEncyclopedia() {
    let query = await server.query("Encyclopedia");
    this.tableData = query.map((item: any) => {
      let detail = item.get("starDetail");
      return {
        id: item.id,
        name: item.get("name"),
        // starDetail: { children: detail },
        userName: item.get("userName"),
        createAt: moment(item.get("createAt")).format("YYYY-MM-DD HH:mm:ss"),
        updateAt: moment(item.get("updateAt")).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
    this.pageination.total = this.tableData.length;
  }

  /**
   * 新增星座运势数据
   */
  private handleShowAddModal(): void {
    this.initForm();
    this.modalTitle = "新增";
    this.showModal = true;
  }

  /**
   * 编辑星座运势数据
   * @param row 行数据
   */
  private handleShowEditModal(row: any): void {
    this.callbackForm(row);
    this.modalTitle = "编辑";
    this.showModal = true;
  }

  /**
   * 删除星座运势数据
   * @param row 行数据
   */
  private handleShowDelModal(row: any): void {
    const { id } = row;
    server
      .delete("Encyclopedia", id)
      .then((resp: any) => {
        this.getEncyclopedia();
      })
      .catch((error: any) => {});
  }

  /**
   * 保存
   */
  private handleOK(): void {
    (this.$refs["$form"] as Form).validate(
      (valid: boolean, formData: object): any => {
        if (valid) {
          this.form.content = this.formatData(this.form, this.detail);
          let id = this.form.id;
          // 判断是否有id，如有则更新，无则新增
          // id ? this.handleUpdate(this.form) : this.handleSave(this.form);
        } else {
          console.log("错误");
        }
      }
    );
  }

  /**
   * 新增数据
   */
  private handleSave(data: formObj): void {
    let form = data;
    delete form.id;
    server
      .add("Encyclopedia", form)
      .then((resp: any) => {
        this.getEncyclopedia();
        this.initForm();
        this.showModal = false;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  /**
   * 更新数据
   */
  private handleUpdate(data: formObj) {
    let form = data;
    delete form.id;
    server
      .update("Encyclopedia", form.id, form)
      .then((resp: any) => {
        this.getEncyclopedia();
        this.initForm();
        this.showModal = false;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  /**
   * 关闭弹框
   */
  private handleCancel(): void {
    this.showModal = false;
  }
  private handleCurrentChange(index: number) {}
  private handleSizeChange(size: number) {}

  /**
   * 回显数据
   * @param data 回显的行数据
   */
  private callbackForm(data: any): void {
    this.form = {
      id: data.id,
      name: data.name,
      content: [],
      userName: "汤圆",
    };
  }

  /**
   * 初始化表单
   */
  private initForm(): void {
    this.form = {
      id: "",
      name: "金牛座",
      content: [],
      userName: "汤圆",
    };
    this.detail = {
      work: "测试事业文案",
      love: "测试爱情文案",
      money: "测试财运文案",
      life: "测试性格文案",
    };
  }

  private formatData(formData: any, detailData: any): any {
    let datailKeys = Object.keys(detailData);
    formData.content = datailKeys.map((item) => {
      const category: any = function (args: string) {
        switch (args) {
          case "work":
            return "事业";
          case "love":
            return "爱情";
          case "money":
            return "金钱";
          case "life":
            return "个性";
        }
      };
      return {
        label: item,
        value: detailData[item],
        category: category(item),
      };
    });
    return formData.starDetail;
  }
}
</script>

<style lang="less" scoped>
.add {
  border: 1px solid #38f;
  color: #38f;
}
.edit {
  margin-right: 10px;
}
.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: center;
}
.topBlock {
  margin-bottom: 10px;
}
.bottomBlock {
  height: 90vh;
}
</style>
