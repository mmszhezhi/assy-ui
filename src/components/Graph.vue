<template>
  <div id="graph">

  </div>
</template>

<script>
import go from 'gojs';
import axios from "axios";
import {mapMutations, mapState} from "vuex";
import {SET_SELECTED_PROCESS} from "../store/mutations.type";

let $ = go.GraphObject.make;

export default {
  name: "Graph",
  data() {
    return {
      statusMap: {
        0: "未执行",
        1: "执行中",
        2: "完成",
        4: "等待输入",
        5: "暂停中",
        6: "故障"
      }
    }
  },
  computed: {
    ...mapState(["selectedOrder"])
  },
  watch: {
    selectedOrder() {
      this.load(this.selectedOrder.no);
    }
  },
  methods: {
    ...mapMutations([SET_SELECTED_PROCESS]),
    select(obj) {
      if (!(obj.part instanceof go.Link)) {
        if (obj.part.isSelected) {
          this.setSelectedProcess(obj.part.data.code);
        } else {
          this.setSelectedProcess("");
        }
      }
    },
    load(no) {
      axios.get(localStorage.getItem("host") + "/emul/orders/" + no + "/graph", {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(response => {
        console.log(response);
        if (response.data.code !== 0) {
          return
        }

        this.$options.graph.model = new go.GraphLinksModel(
            response.data.data.nodes.map((item) => {
              return {key: item.id, code: item.code, name: item.name + " - " + item.dev, loc: item.x + " " + item.y, status: this.statusMap[item.status] + "(" + item.status + ")"}
            }),
            response.data.data.lines.map((item) => {
              let r = {from: item.startOf, to: item.endOf};
              if (item.generated) {
                r.dash = [5, 5]
              }
              return r
            })
        );
      }).catch(error => {
        console.log(error);
      }).then(() => {
      })
    }
  },
  mounted() {
    go.Shape.defineFigureGenerator("RoundedTopRectangle", function (shape, w, h) {
      // this figure takes one parameter, the size of the corner
      var p1 = 5;  // default corner size
      if (shape !== null) {
        var param1 = shape.parameter1;
        if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
      }
      p1 = Math.min(p1, w / 2);
      p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
      var geo = new go.Geometry();
      // a single figure consisting of straight lines and quarter-circle arcs
      geo.add(new go.PathFigure(0, p1)
          .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
          .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
          .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
          .add(new go.PathSegment(go.PathSegment.Line, w, h))
          .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
      // don't intersect with two top corners when used in an "Auto" Panel
      geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
      geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
      return geo;
    });
    this.$options.graph = $(go.Diagram, "graph",
        {
          initialContentAlignment: go.Spot.Center,
          "undoManager.isEnabled": true
        }
    );
    // define a simple Node template
    this.$options.graph.nodeTemplate =
        $(go.Node, "Auto",  // the Shape will go around the TextBlock
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape, "RoundedRectangle",
                {
                  strokeWidth: 0, fill: "lightgray",
                  spot1: go.Spot.TopLeft,
                  spot2: go.Spot.BottomRight
                }
            ),
            $(go.Panel, "Table",
                $(go.Panel, "Spot",
                    {row: 0},
                    $(go.Shape, "RoundedTopRectangle",
                        {strokeWidth: 0, fill: "orange", desiredSize: new go.Size(150, 30)}
                    ),
                    $(go.TextBlock, "Text", new go.Binding("text", "key"))
                ),
                $(go.TextBlock, "Content 1", {row: 1, margin: 10}, new go.Binding("text", "code")),
                $(go.TextBlock, "Content 2", {row: 2, margin: 0}, new go.Binding("text", "name")),
                $(go.TextBlock, "Content 3", {row: 3, margin: 10}, new go.Binding("text", "status")),
            ),
            {
              selectionChanged: this.select,
            }
        );
    this.$options.graph.isReadOnly = true;

    // but use the default Link template, by not setting Diagram.linkTemplate
    this.$options.graph.linkTemplate =
        $(go.Link,
            { curve: go.Link.Bezier },  // Bezier curve
            $(go.Shape, new go.Binding("strokeDashArray", "dash")),
            $(go.Shape, { toArrow: "Standard" })
        );

    // create the model data that will be represented by Nodes and Links
  }
}
</script>

<style scoped>
#graph {
  width: 100%;
  height: 1200px;
}

#graph >>> canvas {
  outline: none;
}
</style>