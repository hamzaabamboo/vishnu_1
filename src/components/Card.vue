<template>
  <div class="__card">
      <div class="_margin">
        <span class="title is-5 is-inline"><slot name='title'></slot></span>
        <span class="subtitle is-7 is-inline"><slot name='author'></slot></span>
      </div>
      <div class="_margin">
        <slot name='body'></slot>
      </div>
  </div>
</template>


<style>
.__card ._margin {
  margin: 15px;
}
.__card {
  background-color: white;
  border-radius: 6px;
  margin: 3px 0;
  padding: .3rem 1rem;
  position: relative;
  width: 100%;
}
@media only screen and (max-width: 2000px) {.__card {width: 33%;}}
@media only screen and (max-width: 1000px) {.__card {width: 49.5%;}}
@media only screen and (max-width:  600px) {.__card {width: 100%;}}


</style>
