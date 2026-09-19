<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10"
          tiledversion="1.11.0"
          name="dual-grid-terrain"
          tilewidth="32"
          tileheight="32"
          tilecount="16"
          columns="4">

    <properties>
      <property tileId="grass" />
    </properties>
    <image source="terrain.png"
           width="128"
           height="128"/>

    <!-- 0000 -->
    <tile id="0" type="empty"/>

    <!-- 0001 = SE -->
    <tile id="1" type="se"/>

    <!-- 0010 = SW -->
    <tile id="2" type="sw"/>

    <!-- 0011 = SW + SE -->
    <tile id="3" type="sw_se"/>

    <!-- 0100 = NE -->
    <tile id="4" type="ne"/>

    <!-- 0101 = NE + SE -->
    <tile id="5" type="ne_se"/>

    <!-- 0110 = NE + SW -->
    <tile id="6" type="ne_sw"/>

    <!-- 0111 = NE + SW + SE -->
    <tile id="7" type="ne_sw_se"/>

    <!-- 1000 = NW -->
    <tile id="8" type="nw"/>

    <!-- 1001 = NW + SE -->
    <tile id="9" type="nw_se"/>

    <!-- 1010 = NW + SW -->
    <tile id="10" type="nw_sw"/>

    <!-- 1011 = NW + SW + SE -->
    <tile id="11" type="nw_sw_se"/>

    <!-- 1100 = NW + NE -->
    <tile id="12" type="nw_ne"/>

    <!-- 1101 = NW + NE + SE -->
    <tile id="13" type="nw_ne_se"/>

    <!-- 1110 = NW + NE + SW -->
    <tile id="14" type="nw_ne_sw"/>

    <!-- 1111 -->
    <tile id="15" type="nw_ne_sw_se"/>

</tileset>
