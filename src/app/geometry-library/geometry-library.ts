import {ElementRef} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TSMap} from 'typescript-map';
import {Point} from './model/point';
import {Line} from './model/line';
import {Plane} from './model/plane';
import {Vector3} from 'three';
import {LineProperty} from './model/line-property';

export class GeometryLibrary {
  drawingDiv: ElementRef;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  width: number;
  height;
  shape;
  points = new Array<Point>();
  lines = new Array<Line>();
  planes = new Array<Plane>();
  pointMaterial = new THREE.PointsMaterial({color: 0x0000ff, size: 0.20});
  lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});

  constructor(drawingDiv: ElementRef) {
    this.drawingDiv = drawingDiv;
    this.width = this.drawingDiv.nativeElement.offsetWidth;
    this.height = this.drawingDiv.nativeElement.offsetHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(this.width, this.height);
    this.drawingDiv.nativeElement.appendChild(this.renderer.domElement);
    // create the scene


    this.camera = new THREE.PerspectiveCamera(
      75, this.width / this.height, 0.1, 1000
    );
    this.camera.position.z = 15;
    this.scene.add(this.camera);

    // lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    this.camera.add(pointLight);
    const axesHelper = new THREE.AxesHelper( 18 );
    this.scene.add( axesHelper );

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
  }

  animate() {
    window.addEventListener('resize', () => {
      this.width = this.drawingDiv.nativeElement.offsetWidth;
      this.height = this.drawingDiv.nativeElement.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;

      this.camera.updateProjectionMatrix();

    });
    this.render();
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  cleanCanvas() {
    while (this.scene.children.length) {
      this.scene.remove(this.scene.children[0]);
    }
    this.points = [];
    this.lines = [];
    this.planes = [];
    this.scene.add(this.camera);
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.scene.add(ambientLight);
  }

  addPoint(point: Point) {
    this.points.push(point);
    const geometry = new THREE.BufferGeometry().setFromPoints([new Vector3(point.x, point.z, point.y)]);
    const p = new THREE.Points(geometry, this.pointMaterial);
    this.scene.add(p);
  }

  addLineIntersection(notation: string, line1: Line, line2: Line) {
    if (this.areLinesParallel(line1, line2)) {
      return false;
    }
    const coordinates = this.getPointCoordinatesFromIntersection(line1, line2);
    const point = new Point(notation, coordinates[0], coordinates[1], coordinates[2]);
    this.addPoint(point);
    return true;
  }

  private getPointCoordinatesFromIntersection(line1: Line, line2: Line) {
    const lineEq1 = line1.getLineEquation();
    const lineEq2 = line2.getLineEquation();
    let eq1 = -1;
    let eq2 = -2;
    let found = false;
    console.log(lineEq1, lineEq2);
    for (let i = 0; i < 3 && !found; i++) {
      if (lineEq1[1][i] !== 0) {
        for (let j = 0; j < 3 && !found; j++) {
          if (i === j && lineEq2[1][j] === 0) {
            eq1 = i;
            eq2 = j;
            found = true;
          } else if (i !== j) {
            console.log(lineEq1[1][i], lineEq2[1][j], lineEq1[1][j], lineEq2[1][i]);
            console.log(lineEq1[1][i] * lineEq2[1][j], lineEq1[1][j] * lineEq2[1][i]);
            if (lineEq1[1][i] * lineEq2[1][j] !== lineEq1[1][j] * lineEq2[1][i]) {
              eq1 = i;
              eq2 = j;
              found = true;
            }
          }
        }
      }
    }
    console.log(eq1, eq2);
    if (!found) {
      return false;
    }
    let t = 0;
    if (lineEq2[1][eq2] === 0) {
      t = (lineEq2[0][eq2] - lineEq1[0][eq2]) / lineEq1[1][eq1];
    } else {
      t = (lineEq2[0][eq1] * lineEq2[1][eq2] + lineEq1[0][eq2] * lineEq2[1][eq1]
        - lineEq1[0][eq1] * lineEq2[1][eq2] - lineEq2[0][eq2] * lineEq2[1][eq1]);
      t = t / (lineEq1[1][eq1] * lineEq2[1][eq2] - lineEq2[1][eq1] * lineEq1[1][eq2]);
    }
    const coordinates = [];
    for (let i = 0; i < 3; i++) {
      coordinates.push(lineEq1[0][i] + t * lineEq1[1][i]);
    }
    return coordinates;
  }

  areLinesParallel(line1: Line, line2: Line) {
    const lineEq1 = line1.getLineEquation();
    const lineEq2 = line2.getLineEquation();
    let ratio = 0;
    let found = false;
    for (let i = 0; i < 3 && !found; i++) {
      if (lineEq1[1][i] !== 0 && lineEq2[1][i] !== 0) {
        ratio = lineEq1[1][i] / lineEq2[1][i];
        found = true;
      }
    }
    if (!found) {
      return true;
    }
    else {
      let parallel = true;
      for (let i = 0; i < 3 && parallel; i++) {
        if (ratio * lineEq2[1][i] !== lineEq1[1][i]) {
          parallel = false;
        }
      }
      return parallel;
    }
  }

  addLine(line: Line) {
    this.lines.push(line);
    const points = [];
    points.push(new Vector3(line.point1.x, line.point1.z, line.point1.y));
    points.push(new Vector3(line.point2.x, line.point2.z, line.point2.y));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const l = new THREE.Line(geometry, this.lineMaterial);
    this.scene.add(l);
  }

  addLineWithProperties(origin: Point, lineProperty: LineProperty) {
    console.log(origin, lineProperty);
    if (lineProperty.property === 'perpendicular') {
      if (lineProperty.line != null) {
        const coordinates = this.addLinePerpendicularOnLine(origin, lineProperty.line);
        const point = new Point(lineProperty.notation, coordinates[0], coordinates[1], coordinates[2]);
        this.addPoint(point);
        const line = new Line(origin, point);
        this.addLine(line);
      }
      else if (lineProperty.plane != null) {
        const coordinates = this.addLinePerpendicularOnPlane(origin, lineProperty.plane);
      }
    }
    else if (lineProperty.property === 'contained') {

    }
  }

  private addLinePerpendicularOnLine(origin: Point, line: Line) {
    const lineEq = line.getLineEquation();
    const vector = [];
    vector.push([]);
    vector[0].push(lineEq[0][0] - origin.x);
    vector[0].push(lineEq[0][1] - origin.y);
    vector[0].push(lineEq[0][2] - origin.z);
    vector.push([]);
    for (let i = 0; i < 3; i++) {
      vector[1].push(lineEq[1][i]);
    }
    let m = 0;
    let n = 0;
    for (let i = 0; i < 3; i++) {
      m = m + vector[0][i] * lineEq[1][i];
      n = n + vector[1][i] * lineEq[1][i];
    }
    const t = m / n * (-1);
    console.log(m, n, t);
    const coordinates = [];
    for (let i = 0; i < 3; i++) {
      coordinates.push(lineEq[0][i] + t * lineEq[1][i]);
    }
    return coordinates;
  }

  private addLinePerpendicularOnPlane(origin: Point, plane: Plane) {

  }

  getLineProperties() {
    const properties = [];
    console.log(this.lines);
    for (const l of this.lines) {
      let property = new LineProperty('perpendicular', l, null);
      properties.push(property);
      property = new LineProperty('contained', l, null);
      properties.push(property);
    }
    for (const p of this.planes) {
      const property = new LineProperty('perpendicular', null, p);
      properties.push(property);
    }
    console.log(properties);
    console.log('helloooo');
    return properties;
  }

  addPlane(plane: Plane) {
    this.planes.push(plane);
  }

  setShape(shapeName: string, propertyMap: TSMap<string, number>) {
    let geometry;
    this.scene.remove(this.shape);
    if (shapeName === 'cube') {
      geometry = this.setCube();
    } else if (shapeName === 'rectangular parallelepiped') {
      geometry = this.setParallelepiped(propertyMap);
    } else if (shapeName === 'sphere') {
      geometry = this.setSphere();
    } else if (shapeName === 'cylinder') {
      geometry = this.setCylinder(propertyMap);
    } else if (shapeName === 'regular tetrahedron') {
      geometry = this.setTetrahedron(propertyMap);
    }
    this.setShapeScene(shapeName, geometry);
  }

  setShapeScene(shapeName, geometry) {
    if (shapeName === 'sphere') {
      const material = new THREE.MeshBasicMaterial({color: 0xb32222, wireframe: true, opacity: 0.5});
      this.shape = new THREE.Mesh(geometry, material);
      this.shape.rotation.x += 0.5;
      this.shape.rotation.y -= 0.5;
      this.scene.add(this.shape);
    } else {
      [THREE.BackSide, THREE.FrontSide].forEach((side) => {
        const material = new THREE.MeshPhongMaterial({
          color: 0x1776a6,
          opacity: 0.5,
          transparent: true,
          side,
        });
        this.shape = new THREE.Mesh(geometry, material);
        this.shape.rotation.x += 0.5;
        this.shape.rotation.y -= 0.5;
        this.scene.add(this.shape);
      });
    }
  }

  existentLine(point1: Point, point2: Point) {
    for (const l of this.lines) {
      if (l.point1 === point1 && l.point2 === point2) {
        return true;
      } else if (l.point1 === point2 && l.point2 === point1) {
        return true;
      }
    }
    return false;
  }

  existentPoint(point: Point) {
    if (this.existentPointNotation(point.notation)) {
      return true;
    } else {
      for (const p of this.points) {
        if (p.x === point.x && p.y === point.y && p.z === point.z) {
          return true;
        }
      }
    }
    return false;
  }

  existentPointNotation(notation: string) {
    for (const p of this.points) {
      if (p.notation === notation) {
        return true;
      }
    }
    return false;
  }

  private setSphere() {
    console.log('sphere');
    return new THREE.SphereBufferGeometry(1.5, 20, 20);
  }

  private setCube() {
    return new THREE.BoxGeometry(1.5, 1.5, 1.5);
  }

  private setParallelepiped(propertyMap: TSMap<string, number>) {
    let pLength;
    let pWidth;
    let pHeight;
    [pLength, pWidth, pHeight] = [propertyMap.get('length'), propertyMap.get('width'), propertyMap.get('height')];
    [pLength, pWidth, pHeight] = this.getParallelepipedDimensions(pLength, pWidth, pHeight);
    return new THREE.BoxGeometry(pLength, pHeight, pWidth);
  }

  private getParallelepipedDimensions(pLength, pWidth, pHeight) {
    let maxValue = pLength;
    if (maxValue < pWidth) {
      maxValue = pWidth;
    }
    if (maxValue < pHeight) {
      maxValue = pHeight;
    }
    const scale = maxValue / 1.75;
    pLength = pLength / scale;
    pWidth = pWidth / scale;
    pHeight = pHeight / scale;
    return [pLength, pWidth, pHeight];
  }


  private setCylinder(propertyMap: TSMap<string, number>) {
    let cRadius;
    let cHeight;
    [cRadius, cHeight] = [propertyMap.get('radius'), propertyMap.get('height')];
    [cRadius, cHeight] = this.getCylinderDimensions(cRadius, cHeight);
    console.log(cRadius, cHeight);
    return new THREE.CylinderGeometry(cRadius, cRadius, cHeight, 32);
  }

  private getCylinderDimensions(cRadius, cHeight) {
    const scale = cRadius / 0.8;
    cRadius = cRadius / scale;
    cHeight = cHeight / scale;
    return [cRadius, cHeight];
  }

  private setTetrahedron(propertyMap: TSMap<string, number>) {
    return new THREE.TetrahedronGeometry(1.5);
  }
}
