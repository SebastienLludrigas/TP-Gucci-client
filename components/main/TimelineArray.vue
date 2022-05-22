<template>
  <div>
    <h2>Frise chronologique</h2>
    <section class="container">
      <table class="table">
        <thead>
          <tr>
            <th class="col-sticky hidden" />
            <th class="col-sticky week" colspan="5">
              S06
            </th>
            <th class="col-sticky week" colspan="5">
              S07
            </th>
            <th class="col-sticky week" colspan="5">
              S08
            </th>
            <th class="col-sticky week" colspan="5">
              S09
            </th>
            <th class="col-sticky week" colspan="5">
              S10
            </th>
            <th class="col-sticky week" colspan="5">
              S11
            </th>
            <th class="col-sticky week" colspan="5">
              S12
            </th>
            <th class="col-sticky week" colspan="5">
              S13
            </th>
            <th class="col-sticky week" colspan="5">
              S14
            </th>
            <th class="col-sticky week" colspan="5">
              S15
            </th>
            <th class="col-sticky week" colspan="5">
              S06
            </th>
            <th class="col-sticky week" colspan="5">
              S07
            </th>
            <th class="col-sticky week" colspan="5">
              S08
            </th>
            <th class="col-sticky week" colspan="5">
              S09
            </th>
            <th class="col-sticky week" colspan="5">
              S10
            </th>
            <th class="col-sticky week" colspan="5">
              S11
            </th>
            <th class="col-sticky week" colspan="5">
              S12
            </th>
            <th class="col-sticky week" colspan="5">
              S13
            </th>
            <th class="col-sticky week" colspan="5">
              S14
            </th>
            <th class="col-sticky week" colspan="5">
              S15
            </th>
          </tr>
          <tr>
            <th class="col-sticky couloir head">
              Couloir
            </th>
            <th v-for="num in 100" :key="num + 1.1" class="col-sticky day">
              8/2
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="3">
              C01
            </td>
            <td v-for="num in 15" :key="num + 1.2" />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 1
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td v-for="num in 65" :key="num + 1.3" />
          </tr>
          <tr>
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
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 2
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td v-for="num in 77" :key="num + 1.4" />
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="3">
              Projet 3
            </td>
            <td />
            <td />
            <td />
            <td />
            <td v-for="num in 90" :key="num + 1.5" />
          </tr>

          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="1">
              C02
            </td>

            <td style="background-color: #1F8B24;" colspan="8">
              Projet 4
            </td>
            <td />
            <td />
            <td v-for="num in 90" :key="num + 1.6" />
          </tr>
          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="1">
              C03
            </td>
            <td v-for="num in 10" :key="num + 1.7" />
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 5
            </td>
            <td />
            <td />
            <td v-for="num in 80" :key="num + 1.8" />
          </tr>

          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="3">
              C04
            </td>
            <td v-for="num in 20" :key="num + 1.9" />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="6">
              Projet 6
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
            <td v-for="num in 60" :key="num + 1.11" />
          </tr>
          <tr>
            <td v-for="num in 15" :key="num + 1.12" />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="6">
              Projet 7
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
            <td v-for="num in 65" :key="num + 1.13" />
          </tr>
          <tr>
            <td v-for="num in 5" :key="num + 1.14" />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 8
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
            <td v-for="num in 75" :key="num + 1.15" />
          </tr>
          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="2">
              C05
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
            <td style="background-color: #1F8B24;" colspan="5">
              Projet 9
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
            <td />
            <td />
            <td />
            <td />
            <td />
            <td v-for="num in 70" :key="num + 1.16" />
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 10
            </td>
            <td v-for="num in 90" :key="num + 1.17" />
          </tr>
          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="2">
              C06
            </td>

            <td v-for="num in 20" :key="num + 1.18" />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 11
            </td>
            <td />
            <td />
            <td v-for="num in 70" :key="num + 1.19" />
          </tr>
          <tr>
            <td v-for="num in 10" :key="num + 1.21" />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="5">
              Projet 12
            </td>
            <td />
            <td v-for="num in 80" :key="num + 1.215" />
          </tr>
          <tr>
            <td class="col-sticky couloir" scope="row" rowspan="3">
              C07
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="3">
              Projet 13
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
            <td />
            <td v-for="num in 80" :key="num + 1.2245" />
          </tr>
          <tr>
            <td v-for="num in 15" :key="num + 1.236" />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="6">
              Projet 14
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
            <td v-for="num in 65" :key="num + 1.2478" />
          </tr>
          <tr>
            <td v-for="num in 5" :key="num + 1.256" />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td style="background-color: #1F8B24;" colspan="4">
              Projet 15
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
            <td v-for="num in 75" :key="num + 1.2678" />
          </tr>
          <tr>
            <td class="col-sticky couloir" scope="row">
              C08
            </td>
            <td style="background-color: #1F8B24;" colspan="3">
              Projet 16
            </td>
            <td />
            <td />
            <td v-for="num in 95" :key="num + 1.27569" />
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-size: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.container {
  width: 80%;
  max-height: 71vh;
  margin: 3rem auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  overflow: auto;

  .table {
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
    outline: 1px solid $vert-pastel;
    outline-offset: -1px;
    text-align: center;
    vertical-align: middle;
    padding: 0;
  }

  tr {
    min-height: 25px;
    height: 25px;

    &:nth-child(even) {
      background-color: white;
    }

    &:nth-child(even) td[scope=row] {
      background-color: white;
    }

    &:nth-child(odd) td[scope=row] {
      background-color: white;
    }
  }

  td {
    outline: 1px solid $vert-pastel;
    outline-offset: -1px;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  .col-sticky {
    position: sticky;

    &.hidden {
      left: 0;
      min-width: 75px;
      width: 75px;
      background-color: white;
      outline: none;
      z-index: 50;
    }

    &.week {
      min-width: 250px;
      width: 250px
    }

    &.couloir {
      left: 0;
      min-width: 80px;
      width: 80px;
      color: #333;
      font-weight: bold;
    }

    &.head {
      top: 30px;
      z-index: 50;
      color: #fff;
    }

    &.day {
      top: 30px;
    }
  }
}
</style>
