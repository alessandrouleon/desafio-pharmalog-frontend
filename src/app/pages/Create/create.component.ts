import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProdutoModel, ProdutoResponse } from '../models/produto';
import { ProdutoService } from '../service/produto.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'code', 'description', 'price', 'quantityInStock', 'Categoria', 'actions'];
  dataSource = new MatTableDataSource<ProdutoModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userForm!: FormGroup;
  hiddenBtnSave = false;
  hiddenBtnUpdate = true;
  isEdition = false;
  editionId: number | null = null;
  search_text = '';
  status: Status[] = [
    { value: 'Disponível', viewValue: 'Disponível' },
    { value: 'Vendido', viewValue: 'Vendido' },
    { value: 'Em negociação', viewValue: 'Em negociação' },
  ];

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.getProducts();
    this.updateEditProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.setPaginatorLabels();
  }

  createUserForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      price: ['', Validators.required],
      quantityInStock: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      category: ['', [Validators.required]],
      active: [false],
    });
    this.userForm.markAsUntouched();
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }
    if (control?.hasError('maxlength')) {
      return `Máximo de ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    }
    if (control?.hasError('pattern')) {
      return 'Campo inválido.';
    }
    return '';
  }

  criarProduto(): void {

    if (this.userForm.valid) {
      const produto: ProdutoModel = {
        ...this.userForm.value,
        active: this.userForm.value.active
      };

      this.produtoService.createProduto(produto).subscribe(() => {
        this.getProducts();
        this.resetForm();
      });
    }
  }

  produtoEdition(element: ProdutoModel): void {
    this.hiddenBtnSave = true;
    this.hiddenBtnUpdate = false;
    this.produtoService.setProdutoEdition(element);
    this.isEdition = true;
    this.editionId = element._id ?? null;
  }


  updateEditProducts(): void {
    this.produtoService.getProdutoEdition().subscribe((produto: ProdutoModel | null) => {

      if (produto) {
        this.userForm.patchValue(produto);
        this.hiddenBtnSave = false;
        this.hiddenBtnUpdate = true;
      }
    });
  }

  onUpdate(): void {
    if (this.editionId !== null && this.userForm.valid) { // Verifica se editionId não é null
      const produto: ProdutoModel = this.userForm.value;
      this.produtoService.updateProduto(this.editionId, produto).subscribe(() => {
        this.getProducts();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.hiddenBtnSave = false;
    this.hiddenBtnUpdate = true;
  }


  getProducts(): void {
    this.produtoService.getAllProducts().subscribe((resp: ProdutoResponse) => {
      this.dataSource.data = resp.products || [];
    });
  }


  deletar(element: ProdutoModel): void {
    if (element._id !== undefined) { // Verifica se id não é undefined
      this.produtoService.deletar(element._id).subscribe(() => {
        this.getProducts();
      });
    }
  }

  filterSearch(): void {
    const filteredData = this.dataSource.data.filter((produto: any) => {
      return Object.values(produto).some((value: any) =>
        value.toString().toLowerCase().includes(this.search_text.toLowerCase())
      );
    });
    this.dataSource.data = filteredData;
  }

  setPaginatorLabels(): void {
    this.paginator._intl.itemsPerPageLabel = 'Mostrando';
    this.paginator._intl.nextPageLabel = 'Próxima Página';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
  }
}
