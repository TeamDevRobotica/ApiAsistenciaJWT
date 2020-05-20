import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { VerificarTokenMiddleWar } from "../middlewares/VerificarTokenMiddlewar";
import { Usuario } from "../entity/Usuario";

@JsonController()
@UseBefore(VerificarTokenMiddleWar)
export class UsuarioControlador {

    private usuarioRepository = getRepository(Usuario);

    @Get("/usuarios")
    getAll() {
        return this.usuarioRepository.find({ relations: ['rol'] });
    }

    @Get("/usuarios/:id")
    getOne(@Param("id") id: number) {
        return this.usuarioRepository.findOne(id, { relations: ['rol'] });
    }

    @Post("/usuarios")
    post(@Body() usuario: Usuario) {
        return this.usuarioRepository.save(usuario);
    }

    @Put("/usuarios/:id")
    put(@Param("id") id: number, @Body() usuario: Usuario) {
        return this.usuarioRepository.update(id, usuario);
    }

    @Delete("/usuarios/:id")
    async remove(@Param("id") id: number) {
        let usuarioToRemove = await this.usuarioRepository.findOne(id);
        return this.usuarioRepository.remove(usuarioToRemove);
    }
}