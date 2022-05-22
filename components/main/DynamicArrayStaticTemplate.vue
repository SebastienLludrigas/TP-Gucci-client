<template>
  <section class="container">
    <table class="table">
      <thead>
        <tr>
          <th class="col-sticky hidden" colspan="3" />
          <th
            v-for="week in weeks"
            :key="week"
            class="col-sticky week"
            colspan="5"
          >
            {{ week }}
          </th>
        </tr>
        <tr>
          <th class="col-sticky couloir head">
            Couloir
          </th>
          <th class="col-sticky plateforme head">
            Plateforme
          </th>
          <th class="col-sticky application head">
            Application
          </th>
          <th v-for="num in 100" :key="num" class="col-sticky day">
            8/2
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="start-couloir-row">
          <td class="col-sticky couloir" scope="row" rowspan="6">
            C01
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td style="background-color: #9bd3ae" colspan="4" />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td v-for="num in 80" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td style="background-color: #f99d1d" colspan="4" />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td v-for="num in 77" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row" rowspan="3">
            PF5
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App3
          </td>
          <td />
          <td />
          <td />
          <td style="background-color: #9bd3ae" colspan="3" />
          <td />
          <td />
          <td />
          <td />
          <td v-for="num in 90" :key="num" />
        </tr>
        <tr class="end-couloir-row">
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr class="start-couloir-row">
          <td class="col-sticky couloir" scope="row" rowspan="4">
            C02
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr class="end-couloir-row">
          <td class="col-sticky plateforme" scope="row">
            PF3
          </td>
          <td class="col-sticky application" scope="row">
            App3
          </td>
          <td style="background-color: #f99d1d" colspan="7" />
          <td />
          <td />
          <td v-for="num in 90" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky couloir" scope="row" rowspan="3">
            C01
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky couloir" scope="row" rowspan="4">
            C02
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td style="background-color: #9bd3ae" colspan="6" />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td v-for="num in 80" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF3
          </td>
          <td class="col-sticky application" scope="row">
            App3
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky couloir" scope="row" rowspan="3">
            C01
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td style="background-color: #f99d1d" colspan="5" />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td v-for="num in 70" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky couloir" scope="row" rowspan="4">
            C02
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF3
          </td>
          <td class="col-sticky application" scope="row">
            App3
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky couloir" scope="row" rowspan="3">
            C01
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky couloir" scope="row" rowspan="4">
            C02
          </td>
          <td class="col-sticky plateforme" scope="row" rowspan="2">
            PF1
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky application" scope="row">
            App2
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF2
          </td>
          <td class="col-sticky application" scope="row">
            App1
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
        <tr>
          <td class="col-sticky plateforme" scope="row">
            PF3
          </td>
          <td class="col-sticky application" scope="row">
            App3
          </td>
          <td v-for="num in 100" :key="num" />
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      // hasBottomBorder: false
    }
  },
  computed: {
    weeks () {
      const weekList = []
      for (let i = 6; i <= 25; i++) {
        if (i < 10) {
          weekList.push(`S0${i}`)
        } else {
          weekList.push(`S${i}`)
        }
      }
      return weekList
    }
  }
}
</script>

<style scoped lang="scss">
//

.container {
  width: 95%;
  max-height: 71vh;
  margin: 2rem auto 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  overflow: auto;

  .table {
    border-collapse: separate;
    border-spacing: 0;
    font-size: 14px;
  }

  th {
    top: 0;
    position: sticky;
    background-color: $bleu;
    color: #fff;
    z-index: 20;
    min-height: 30px;
    height: 30px;
    border: 1px solid #ccc;
    // border-bottom: none;
    text-align: center;
    vertical-align: middle;
    padding: 0;
  }

  tr {
    min-height: 25px;
    height: 25px;

    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:nth-child(even) td[scope="row"] {
      background-color: white;
    }

    &:nth-child(odd) td[scope="row"] {
      background-color: white;
    }
  }

  td {
    border: 1px solid #ccc;
    // border-top: 1px solid #000;
    // border-bottom: none;
    // border-right: none;
    text-align: center;
    vertical-align: middle;

    &.col-sticky.couloir {
      background-color: white;
    }
  }

  .col-sticky {
    position: sticky;

    &.hidden {
      left: 0;
      min-width: 275px;
      width: 275px;
      background-color: white;
      outline: none;
      z-index: 50;
      border: none;
    }

    &.week {
      min-width: 250px;
      width: 250px;
    }

    &.couloir {
      left: 0;
      font-weight: bold;
    }

    &.plateforme {
      left: 67px;
    }

    &.application {
      left: 170px;
    }

    &.head {
      top: 30px;
      z-index: 50;
      font-weight: bold;
    }

    &.day {
      top: 30px;
    }
  }

  // .head,
  // .col-sticky.day {
  //   border-bottom: none;
  // }

  // .start-couloir-row > td {
  //   border-top: 2px solid rgb(114, 114, 114);
  // }

  .start-couloir-row > td:first-child {
    border-bottom: 2px solid rgb(114, 114, 114);
  }

  .end-couloir-row > td {
    border-bottom: 2px solid rgb(114, 114, 114);
  }
}
</style>
