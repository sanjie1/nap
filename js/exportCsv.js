/**
 *
 * 生成一个csv所需参数
 * @传入data对象：
 * @data导入的数据类型 一个数组对象列
 * @heads头部名称
 * @columns要输出的字段名
 * @remove_targets是否需要过滤html标签
 * @spe_column需要处理的数字字段 会在之前加`  避免长数字数据强制转换成科学计数法
 *
 * 例子：
 *  {
 *      'data':{[id:1,name:'a',sort:10],[id:2,name:'b',sort:9],[id:3,name:'c',sort:8]},
 *      'heads':['id号','姓名'],
 *      'columns':['id','name'],
 *      'remove_targets':false,
 *      'spe_column':['id'],
 *  }
 */
var generateCsv = function (data = {}) {

  return new Promise((resolve, reject) => {
    //验证并处理参数
    if (data.heads.length != data.columns.length) {
        //   return { code: false, msg: "表头和内容字段数不符" };
      reject({ code: false, msg: "表头和内容字段数不符" });
    } else if (!$.isArray(data.data)) {
        reject({ code: false, msg: "导入的data不是一个数组" });
    } else {
      if (!data.remove_targets) {
        data.remove_targets = false;
      } else {
        data.remove_targets = true;
      }

      csv_data = data.data;
      heads = data.heads;
      columns = data.columns;
      spe_column = data.spe_column;
      remove_targets = data.remove_targets;

      // 构造csv内容
      var str = "";
      for (var j in csv_data) {
        e = csv_data[j];
        for (var i in columns) {
          c = e[columns[i]];
          if (remove_targets) {
            // c = c.replace(/<[^>]+>/g, "") + ",";    
            c = `${c},`;    
          }
          if (spe_column.length > 0 && spe_column.indexOf(columns[i]) > -1) {
            c = "`" + c;
          }
          str += c;
        }
        str += "\n";
      }
      head_str = "";
      for (var i in heads) {
        head_str += heads[i] + ",";
      }
      head_str += "\n";
      str = head_str + str;

      resolve(str);
    }
  });
};


/**
 *
 * 生成并下载文件
 * @file_name 导出文件名称
 * @content 需导出的csv
 */
function download_file(file_name, content, o = true) {
  if (o) {
    content = "\ufeff" + content;
  }
  var aTag = document.createElement("a");
  var blob = new Blob([content]);
  aTag.download = `${file_name}.csv`
  aTag.href = URL.createObjectURL(blob);
  aTag.click();
  URL.revokeObjectURL(blob);
}
